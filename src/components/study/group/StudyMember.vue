<template>
<!--  <v-card id="desk" class="text-center">-->
<!--    <v-card-title>{{member.nickname}}</v-card-title>-->
<!--    <img :src="img" alt=""/>-->
<!--    <v-card-text class="py-2">{{member.time}}</v-card-text>-->
<!--  </v-card>-->
  <v-menu open-on-hover>
    <template v-slot:activator="{props}" >
      <v-card v-bind="props" id="desk" class="text-center ma-2 study-member">
            <v-card-title>{{member.nickname}}</v-card-title>
            <img :src="img" alt=""/>
            <v-card-text class="py-2">{{studyTime}}</v-card-text>
      </v-card>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-subtitle>
              닉네임
            </v-card-subtitle>
            <v-card-text>
              {{member.nickname}}
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-subtitle>
              시작 시간
            </v-card-subtitle>
            <v-card-text>
              {{ startTime }}
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-subtitle>
              종료 시간
            </v-card-subtitle>
            <v-card-text>
              {{ endTime }}
           </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-subtitle>
              그룹 가입일
            </v-card-subtitle>
            <v-card-text>
              {{ joinedAt }}
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-subtitle>
              출석
            </v-card-subtitle>
            <v-card-text>
              12일째(94%)
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>

    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "StudyMember",
  props: {
    member: Object,
    groupMember: Object,
  },
  data: () => ({
    img: require('@/assets/img/study_icon.png'),
    studyTime: 0,
    startTime: "정보 없음",
    endTime: "정보 없음",
    joinedAt: "정보 없음",
    intervalId: null,
    hour: 0,
    min: 0,
    sec: 0,

    //complete
    dataReady: false,
  }),
  watch: {
    member() {
      clearInterval(this.intervalId)

      this.joinedAt = this.getJoinedAt(this.member.groupMember.joinedAt)
      this.changeIcon(this.member.activeTicket);
      this.getTime(this.getStudyTime(this.member));
    }
  },
  mounted() {
    clearInterval(this.intervalId)

    this.joinedAt = this.getJoinedAt(this.member.groupMember.joinedAt)
    this.changeIcon(this.member.activeTicket);
    this.getTime(this.getStudyTime(this.member));
  },
  methods: {
    getTime(seconds) {
      this.hour = 0;
      this.min = 0;
      if(seconds !== undefined) {
        this.hour = Math.floor(seconds/3600);
        this.min = Math.floor((seconds/60)%60);
      }

      this.sec = seconds%60;
      this.setStudyTime();

      if(this.member.activeTicket != null && this.member.activeTicket.status === "STUDY") {
        this.intervalId = setInterval(() => {
          this.sec++;
          this.setStudyTime()
        }, 1000)
      } else {
        clearInterval(this.intervalId)
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
        min = "0" + min
      }


      this.studyTime = hour + " : " + min
    },
    getTimeHM(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return hours + "시 " + minutes + "분";
    },
    getJoinedAt(isoString) {
      const date = new Date(isoString.substring(0, 19));

      const fullYear = date.getFullYear();
      let month = date.getMonth()+1;
      if(month < 10) {
        month = "0"+month
      }
      let monthDate = date.getDate();
      if(monthDate < 10) {
        monthDate = "0"+monthDate
      }

      return fullYear + "-" + month + "-" + monthDate
    },
    /**
     * 회원의 activeTicket 상태에 따라서 아이콘을 변경한다.
     * @param activeTicket
     */
    changeIcon(activeTicket) {
      if(activeTicket === null) {
        this.img = require('@/assets/img/rest_icon.png')
      } else {
        if(activeTicket.status === "STUDY") {
          this.img = require('@/assets/img/study_icon.png')
        }
        else if(activeTicket.status === "REST") {
          this.img = require('@/assets/img/rest_icon.png')
        }
      }
    },
    /**
     * 회원의 공부 시작 시간과 종료 시간 문자열을 계산하고 총 공부 시간(초)를 반환한다.
     * @returns {number} 총 공부 시간(초)
     */
    getStudyTime(member) {
      const date = new Date();

      let startTime = new Date()
      let endTime = new Date(date.setDate(date.getDate()-1));
      let flag = false;

      //만료된 티켓, 활성화된 티켓의 활성 시간(초)를 모두 더하여 총 공부 시간을 구한다.
      let studyTime = 0;
      for(const ticket of member.expiredTickets) {
        if(ticket.status === "STUDY") {
          flag = true;

          studyTime += ticket.activeTime;

          const ticketStartTime = new Date(ticket.startTime.substring(0, 19));
          const ticketEndTime = new Date(ticket.endTime.substring(0, 19));

          startTime = ticketStartTime < startTime ? ticketStartTime : startTime; //시작 시간이 더 작으면 변경
          endTime = ticketEndTime > endTime ? ticketEndTime : endTime; //종료 시간이 더 크면 변경
        }
      }
      if(member.activeTicket !== null) {
        if(member.activeTicket.status === "STUDY") {
          flag = true;
          const activeTicket = member.activeTicket;
          const date = new Date(activeTicket.startTime.substring(0, 19));

          const seconds = Math.floor(date.getTime() / 1000);
          const now = Math.floor(new Date().getTime() / 1000);

          this.endTime = "공부 중"

          startTime = activeTicket.startTime < startTime ? activeTicket.startTime : startTime; //시작 시간이 더 작으면 변경
          studyTime = now - seconds + member.studyTime;
        }
      }

      if(flag) {
        this.startTime = this.getTimeHM(startTime)
        this.endTime = this.getTimeHM(endTime);
      }
      if(member.activeTicket !== null) {
        if(member.activeTicket.status === "STUDY"){
          this.endTime = "공부 중"
        } else if(member.activeTicket.status === "REST") {
          this.endTime = "휴식 중"
        }
      }

      return studyTime;
    }
  }
}
</script>

<style scoped>
.study-member {
  min-width: 120px;
}
</style>