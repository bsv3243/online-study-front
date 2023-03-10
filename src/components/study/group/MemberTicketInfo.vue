<template>
  <v-card min-height="12vh">
    <v-card-text>
      <div v-if="selectedStudy instanceof Array">
        <p class="text-center">선택된 공부가 없습니다.</p>
      </div>
      <div class="d-flex justify-space-between" v-if="selectedStudy.name">
        <p class="studyInfo" v-text="selectedStudy.name"></p>
        <p class="largeInfo" v-text="getTime(selectedStudy.studyTime)"></p>
      </div>
    </v-card-text>
    <v-card-actions>
      <select-study-menu @study="setStudy"/>
      <v-spacer/>
      <v-btn @click="ticketCreateApiCall">
        시작
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SelectStudyMenu from "@/components/study/group/SelectStudyMenu";

export default {
  name: "MemberTicketInfo",
  props: {
    group: Object
  },
  components: {
    SelectStudyMenu
  },
  data:() => ({
    selectedStudy: [],
    //axios
    //request
    ticketCreateRequest: {
      studyId: null,
      groupId: null,
      status: "STUDY",
    },
    ticketsGetRequest: {
      groupId: null,
      date: new Date().toISOString().substring(0, 10),
      days: 1
    },
    //response
    members: [
      {
        memberId: 1,
        nickname: "member",
        activeTicket: Object,
        expiredTickets: Array
      }
    ],
    //axios complete
    dataReady: false,
  }),
  async mounted() {

    const result = await this.ticketsGetApiCall();
    const member = result.data[0];

    if(member.activeTicket !== null) {
      const study = member.activeTicket.study;

      let studyTime = 0;

      const start = this.getDate(member.activeTicket.startTime).getTime();
      const now = new Date().getTime();

      studyTime += Math.floor(now/1000) - Math.floor(start/1000);

      for(const ticket of member.expiredTickets) {
        if(ticket.study.studyId === study.studyId) {
          studyTime += ticket.activeTime;
        }
      }

      this.selectedStudy = study;
      this.selectedStudy.studyTime = studyTime;
    }

    this.dataReady = true
  },
  methods: {
    setMemberStudies(value) {
      this.memberStudies = value;
    },
    setStudy(value) {
      this.selectedStudy = value;
    },
    getTime(seconds) {
      let hours;
      let mins;
      if(seconds === undefined) {
        hours = 0;
        mins = 0;
      } else {
        hours = Math.floor(seconds/3600);
        mins = Math.floor((seconds/60) % 60);
      }

      return hours + "시간 " + mins + "분";
    },
    async ticketCreateApiCall() {
      if(this.selectedStudy instanceof Array) {
        alert("공부가 지정되지 않았습니다.");
        return;
      }
      this.ticketCreateRequest.studyId = this.selectedStudy.studyId;
      this.ticketCreateRequest.groupId = this.group.groupId

      try {
        const response = await this.axios.post("http://localhost:8080/api/v1/tickets", this.ticketCreateRequest);

        console.log(response)
        console.log(response.data.data);

        return response.data;
      } catch (err) {
        console.log("잠시 후에 다시 시도해주세요.");

        this.$global.printError(err)
      }
    },
    async ticketsGetApiCall() {

      try{
        const response = await this.axios.get("http://localhost:8080/api/v1/tickets", {
          params: {
            groupId: null,
            date: this.ticketsGetRequest.date,
            days: this.ticketsGetRequest.days
          }
        });

        return response.data;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");

        this.$global.printError(err)
      }
    },
    getDate(isoString) {
      return new Date(isoString.substring(0, 19));
    }
  }
}
</script>

<style scoped>

</style>