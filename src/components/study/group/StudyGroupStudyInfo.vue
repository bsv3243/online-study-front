<template>
  <v-card min-height="12vh">
    <v-card-text class="roomInfo">

      <v-container class="pa-0">
        <v-row>
          <v-col>
            <v-card-subtitle class="px-0">평균 공부 시간</v-card-subtitle>
            <p>{{ studyTime }}</p>
          </v-col>
          <v-col>
            <v-card-subtitle class="px-0">출석률</v-card-subtitle>
            <p>{{attendRate}}%</p>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex align-center largeInfo">
        <p>현재 {{studyMemberSize}}명 공부 중</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "StudyGroupStudyInfo",
  props: {
    members: Array,
    stompCounter: Number,
  },
  data:() => ({
    studyMemberSize: 0,
    studyTime: 0,
    intervalId: null,
    attendRate: 0,
    hour: 0,
    min: 0,
    sec: 0,
  }),
  mounted() {
    this.init()
  },
  watch: {
    stompCounter() {
      console.log(this.members)

      this.init()
    },
  },
  methods: {
    getTimeHM(seconds) {
      const number = Math.floor(seconds / this.members.length);

      let hour = 0;
      let min = 0;
      if(number !== undefined) {
        hour = Math.floor(number/3600);
        min = Math.floor((number/60)%60);

        if(min < 10) {
          min = "0" + min;
        }
      }

      return hour + "시간 " + min + "분";
    },
    init() {
      clearInterval(this.intervalId)
      let studyTime = 0;
      let num = 0;
      let attended = 0;
      for(const member of this.members) {
        if(member.activeTicket !== null && member.activeTicket.status === "STUDY") {
          num++;

          const date = new Date(member.activeTicket.startTime.substring(0, 19));

          const seconds = Math.floor(date.getTime() / 1000);
          const now = Math.floor(new Date().getTime() / 1000);

          studyTime += now - seconds
        }
        if(member.activeTicket !== null || member.expiredTickets.length > 0) {
          attended++;
        }
        studyTime += member.studyTime;
      }
      //현재 공부중인 사람
      this.studyMemberSize = num;

      //평균 공부시간
      this.studyTime = this.getTimeHM(studyTime)
      if(this.studyMemberSize !== 0) {
        this.intervalId = setInterval(() => {
          studyTime++;
          this.studyTime = this.getTimeHM(studyTime);
        }, 10 * this.members.length)
      } else {
        clearInterval(this.intervalId)
      }

      //금일 출석률
      this.attendRate = Math.floor(attended/this.members.length*100);
    },
  }
}
</script>

<style scoped>
.roomInfo {
  display: grid;
  grid-template-rows: 1fr 1fr;
  min-height: inherit;
}
.largeInfo {
  font-size: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
.studyInfo {
  font-size: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
</style>