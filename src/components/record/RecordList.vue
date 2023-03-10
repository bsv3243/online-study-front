<template>
  <v-sheet min-height="90vh">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3">
              총 공부시간 합산 차트
            <v-card-text>
              <PieChart :member-ticket="memberTicket" v-if="dataReady"/>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부시간 차트
            <div style="height: 30vh">
              <StackedBarChart :member-ticket="memberTicket" :ticketGetRequest="ticketGetRequest" v-if="dataReady"/>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부 시작 종료 시간 차트
            <div style="height: 30vh">
            <FloatingBarChar :member-ticket="memberTicket" :request="ticketGetRequest" v-if="dataReady"/>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import StackedBarChart from "@/components/record/chart/StackedBarChart";
import FloatingBarChar from "@/components/record/chart/FloatingBarChar";
import PieChart from "@/components/record/chart/PieChart";
import {useMemberStore} from "@/store/MemberStore";
import {useLoginStore} from "@/LoginStore";
export default {
  name: "RecordList",
  components: {PieChart, FloatingBarChar, StackedBarChart},
  setup() {
    const memberStore = useMemberStore();
    const loginStore = useLoginStore();

    return {memberStore, loginStore};
  },
  async mounted() {
    await this.ticketGetApiCall(7)
  },
  data:() => ({
    //axios
    //request
    ticketGetRequest: {
      date: new Date(),
      days: 7,
    },
    //response
    memberTicket: {
      memberId: 1,
      nickname: "member",
      studyTime: 0,
      activeTicket: Object,
      expiredTickets: [
        {
          ticketId: 1,
          status: "STUDY",
          activeTime: 3600,
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          study: {
            studyId: 1,
            name: "study"
          }
        }
      ]
    },
    ticket: {
      ticketId: 1,
      status: "STUDY",
      activeTime: 3600,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      study: {
        studyId: 1,
        name: "study"
      }
    },
    //complete
    dataReady: false,
  }),
  methods: {
    async ticketGetApiCall(days) {
      this.ticketGetRequest.days = days;

      const now = new Date();
      if(now.getHours() < 4) {
        now.setDate(now.getDate()-1);
      }

      let date = now;
      date.setDate(date.getDate()-days)

      this.ticketGetRequest.date = now;

      if(!this.loginStore.isLogin) {
        this.dataReady = true
        return
      }
      try {
        const response = await this.axios.get("http://localhost:8080/api/v1/tickets", {
          params: {
            date: date.toISOString().substring(0, 10),
            days: days
          }
        });

        this.memberTicket = response.data.data

        console.log(response.data.data)

        this.dataReady = true;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
        console.log(err)
      }
    }
  },
}
</script>

<style scoped>

</style>