<template>
  <v-sheet min-height="90vh">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3">
              총 공부시간 합산 차트
            <v-card-text>
              <PieChart :study-records="studyRecords" v-if="dataReady && isRecordExist"/>
              <div class="d-flex justify-center align-center h-100">
                <p v-if="!isRecordExist">데이터 없음</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부시간 차트
            <div style="height: 30vh">
              <StackedBarChart :study-records="studyRecords" :ticketGetRequest="ticketGetRequest" v-if="dataReady && isRecordExist"/>
              <div class="d-flex justify-center align-center h-100">
                <p v-if="!isRecordExist">데이터 없음</p>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부 시작 종료 시간 차트
            <div style="height: 30vh">
<!--            <FloatingBarChar :member-ticket="memberTicket" :study-records="studyRecords" :request="ticketGetRequest" v-if="dataReady"/>-->
              <scatter-chart :study-records="studyRecords" v-if="dataReady && isRecordExist"/>
              <div class="d-flex justify-center align-center h-100">
                <p v-if="!isRecordExist">데이터 없음</p>
              </div>
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
import ScatterChart from "@/components/record/chart/ScatterChart";
export default {
  name: "RecordList",
  components: {ScatterChart, PieChart, FloatingBarChar, StackedBarChart},
  setup() {
    const memberStore = useMemberStore();
    const loginStore = useLoginStore();

    return {memberStore, loginStore};
  },
  async mounted() {
    await this.ticketGetApiCall(7)
    await this.recordGetApiCall()

    if(this.studyRecords.length === 0) {
      this.isRecordExist = false;
    }

    this.dataReady = true;
  },
  data:() => ({

    isRecordExist: true,
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
    studyRecords: [],
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
      date.setDate(date.getDate()-days+1)

      this.ticketGetRequest.date = now;

      if(!this.loginStore.isLogin) {
        this.dataReady = true
        return
      }
      try {
        const response = await this.axios.get("/api/v1/tickets", {
          params: {
            date: date.toISOString().substring(0, 10),
            days: days
          }
        });


        const data = response.data.data;
        if(data.length === 1) {
          this.memberTicket = data[0]
        }

        // this.dataReady = true;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
        console.log(err)
      }
    },
    async recordGetApiCall() {
      let params = {
        memberId: this.memberStore.getMemberId
      }

      try {
        const response = await this.axios.get("/api/v1/records", {
          params: params
        });

        this.studyRecords = response.data.data
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
        console.log(err);
      }
    }
  },
}
</script>

<style scoped>

</style>