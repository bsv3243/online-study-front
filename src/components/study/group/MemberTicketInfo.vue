<template>
  <v-card min-height="12vh">
    <v-card-text>
      <div v-if="selectedStudy instanceof Array">
        <p class="text-center">선택된 공부가 없습니다.</p>
      </div>
      <div class="d-flex justify-space-between" v-if="selectedStudy.name">
        <p class="studyInfo" v-text="selectedStudy.name"></p>
        <p class="largeInfo" v-text="studyTime"></p>
      </div>
    </v-card-text>
    <v-card-actions>
      <select-study-menu @study="setStudy" v-if="!hasActiveTicket"/>
      <v-btn v-if="hasActiveTicket && !isRest" @click="studyToRest">
        휴식
      </v-btn>
      <v-btn @click="ticketCreateApiCall('STUDY')" v-if="isRest">다시 시작</v-btn>
      <v-spacer/>
      <v-btn @click="ticketCreateApiCall('STUDY')" v-if="!hasActiveTicket">
        시작
      </v-btn>
      <v-btn @click="ticketExpireApiCall" v-if="hasActiveTicket">
        중지
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SelectStudyMenu from "@/components/study/group/SelectStudyMenu";
import moment from "moment";
import {useLoginStore} from "@/store/LoginStore";

export default {
  name: "MemberTicketInfo",
  props: {
    group: Object
  },
  components: {
    SelectStudyMenu
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data:() => ({
    selectedStudy: [],
    intervalId: null,
    studyTime: null,
    isStudy: false,
    isRest: false,
    hour: 0,
    min: 0,
    sec: 0,

    hasActiveTicket: false,
    //axios
    //request
    ticketCreateRequest: {
      studyId: null,
      groupId: null,
      status: "STUDY",
    },
    ticketsGetRequest: {
      groupId: null,
      date: moment(new Date()).format().substring(0, 10),
      days: 1
    },
    ticketId: null,
    ticketUpdateRequest: {
      status: "END",
    },
    //response
    member: [
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
    this.member = member;

    if(member.activeTicket !== null) {
      const study = member.activeTicket.study;

      let studyTime = 0;

      if(member.activeTicket.status === "STUDY") {
        const start = this.getDate(member.activeTicket.startTime).getTime();
        const now = new Date().getTime();

        studyTime += Math.floor(now / 1000) - Math.floor(start / 1000);
      } else {
        this.isRest = true;
      }

      for(const ticket of member.expiredTickets) {
        if(ticket.study.studyId === study.studyId && ticket.status==="STUDY") {
          studyTime += ticket.activeTime;
        }
      }

      this.selectedStudy = study;
      this.selectedStudy.studyTime = studyTime;

      this.getTime(studyTime);

      this.ticketId = member.activeTicket.ticketId
      this.hasActiveTicket = true;
    }

    this.dataReady = true
  },
  methods: {
    emitData(str, data) {
      this.$emit(str, data);
    },
    setMemberStudies(value) {
      this.memberStudies = value;
    },
    setStudy(value) {
      this.selectedStudy = value;
    },
    getTime(seconds) {
      clearInterval(this.intervalId)
      if(seconds !== undefined)  {
        this.hour = Math.floor(seconds/3600);
        this.min = Math.floor((seconds/60) % 60);

        if(this.member.activeTicket !== null && this.member.activeTicket.status === "STUDY") {
          this.sec = seconds % 60;
          this.setStudyTime()
          if(this.member.activeTicket.status === "STUDY") {
            this.intervalId = setInterval(() => {
              this.sec++;
              this.setStudyTime()
            }, 1000)
          }
        } else {
          this.studyTime = this.hour + "시간 " + this.min + "분"
          clearInterval(this.intervalId)
        }
      }
    },
    setStudyTime() {
      let sec = this.sec;
      let min = this.min;
      let hour = this.hour;

      if (sec >= 60) {
        min++;
        this.min++;
        this.sec = sec - 60;
      }
      if (min >= 60) {
        hour++;
        this.hour++;
        this.min = min - 60;
      }
      if(min < 10) {
        min = "0" + min;
      }
      this.studyTime = hour + "시간 " + min + "분"
    },
    async studyToRest() {
      await this.ticketExpireApiCall();
      await this.ticketCreateApiCall("REST")
    },
    async ticketCreateApiCall(status) {
      if(this.selectedStudy instanceof Array) {
        alert("공부가 지정되지 않았습니다.");
        return;
      }
      this.ticketCreateRequest.studyId = this.selectedStudy.studyId;
      this.ticketCreateRequest.groupId = this.group.groupId
      this.ticketCreateRequest.status = status

      if(this.member.activeTicket !== null) {
        await this.ticketExpireApiCall()
      }
      this.isRest = status !== "STUDY";

      try {
        const response = await this.axios.post("/api/v1/tickets", this.ticketCreateRequest);

        this.ticketId = response.data.data;

        this.emitData("ticketId", this.ticketId);

        this.hasActiveTicket = true;

        this.emitData("isStudying", true);

        return response.data;
      } catch (err) {
        console.log("잠시 후에 다시 시도해주세요.");

        this.$global.printError(err)
      }
    },
    async ticketExpireApiCall() {
      this.ticketUpdateRequest.status = "END"
      clearInterval(this.intervalId)
      try {
        const response = await this.axios
            .patch("/api/v1/ticket/" + this.ticketId, this.ticketUpdateRequest);

        const ticketId = response.data.data;

        this.emitData("ticketId", ticketId);
        this.hasActiveTicket = false;
      } catch (err) {
        console.log(err);
      }
    },
    async ticketsGetApiCall() {
      const memberId = this.loginStore.getMemberId
      try{
        const response = await this.axios.get("/api/v1/tickets", {
          params: {
            memberId: memberId,
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