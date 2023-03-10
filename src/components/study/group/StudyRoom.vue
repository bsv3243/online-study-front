<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-col cols="5">
        <v-card min-height="12vh">
          <v-card-text class="roomInfo">

            <v-container class="pa-0">
              <v-row>
                <v-col>
                  <v-card-subtitle class="px-0">평균 공부 시간</v-card-subtitle>
                  <p>5시간 35분</p>
                </v-col>
                <v-col>
                  <v-card-subtitle class="px-0">출석률</v-card-subtitle>
                  <p>75%</p>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex align-center largeInfo">
              <p>현재 12명 공부 중</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <member-ticket-info @ticketId="send" :group="group"/>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <div class="room" v-if="dataReady">
          <StudyMember
              v-for="(member, i) in members"
              :key="i"
              :member="member"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Stomp from "webstomp-client"
import SockJS from "sockjs-client"

import StudyMember from "@/components/study/group/StudyMember";
import MemberTicketInfo from "@/components/study/group/MemberTicketInfo";
export default {
  name: "StudyRoom",
  components: {MemberTicketInfo, StudyMember},
  watch: {
    notSelected() {
    }
  },
  props: {
    group: Object
  },
  data: () => ({
    menu: false,
    showDialog: false,

    img: require('@/assets/img/study_icon.png'),
    memberStudies: [],
    ticketId: null,

    //stomp
    stompClient: null,

    //axios
    //request
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
  created() {
    this.connect()
  },
  async mounted() {
    const result = await this.ticketsGetApiCall();
    this.members = result.data;

    let groupMembers = this.group.groupMembers;
    for(let groupMember of groupMembers) {
      const find = this.members.find(member => member.memberId === groupMember.memberId);
      find.groupMember = groupMember;
    }

    console.log(this.memberStudies)

    this.dataReady = true

  },
  unmounted() {
    this.disconnect()
  },
  methods: {
    test() {
      this.menu = false;
    },
    setMemberStudies(value) {
      this.memberStudies = value;
    },
    getTime(seconds) {
      let hours;
      let mins;
      if(seconds === undefined) {
        hours = 0;
        mins = 0;
      } else {
        hours = seconds/3600;
        mins = (seconds/60) % 60;
      }

      return hours + "시간 " + mins + "분";
    },
    async ticketsGetApiCall(groupId) {
      if(groupId !== null) {
        this.ticketsGetRequest.groupId = groupId
      }

      try{
        const response = await this.axios.get("http://localhost:8080/api/v1/tickets", {
          params: {
            groupId: this.ticketsGetRequest.groupId,
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
    connect() {
      const sockJS = new SockJS("http://localhost:8080/ws");
      this.stompClient = Stomp.over(sockJS)

      this.stompClient.connect(
          {},
          frame => {
            console.log("connected");
            this.stompClient.subscribe("/sub/group/" + this.group.groupId, response => {
              console.log("응답: ", response)
              console.log("응답 데이터: ", JSON.parse(response.body))
              const result = JSON.parse(response.body);
              let data = result.data;

              const groupMember = this.group.groupMembers.find(member => member.memberId === data.memberId);
              data.groupMember = groupMember;

              const idx = this.members.findIndex(member => member.memberId===data.memberId);
              this.members[idx] = data;

              console.log(this.members)
            });
          },
          error => {
            console.log("connecting fail")
          }
      )
    },
    disconnect() {
      this.stompClient.disconnect(frame => {

      }, {})
    },
    send(ticketId) {
      let message = {
        ticketId: ticketId,
        groupId: this.group.groupId,
      }

      this.stompClient.send("/pub/groups", JSON.stringify(message))
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap');

  .room {
    min-height: 70vh;
    border: 2px solid #d9d9d9;
    border-radius: 10px;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
  }
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