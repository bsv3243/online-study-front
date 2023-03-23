<template>
  <div class="gap-container">
    <div class="d-flex justify-space-between">
      <strong>타임라인</strong>
      <vue-date-picker class="date-picker"
                       v-model="date"
                       :format-locale="ko"
                       format="Y-MM-dd"
                       :max-date="new Date()"
                       :enable-time-picker="false"/>
    </div>
      <v-timeline side="end" align="start">
        <v-timeline-item v-for="ticket of ticketDtos"
                         :key="ticket.startTime"
                         :dot-color="getColor(ticket.status)"
                         size="small">
          <div class="d-flex">
            <strong class="me-4">{{ticket.startTime}} - {{ticket.endTime}}</strong>
            <div>
              <strong>{{getStudyNameOrRest(ticket)}}</strong>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
  </div>
</template>

<script>
import {useMemberStore} from "@/store/MemberStore";
import moment from "moment";

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {ko} from 'date-fns/locale'

export default {
  name: "RecordTimeLine",
  components: {
    VueDatePicker,
  },
  props: {
    times: Object,
    selectedStudy: Object,
  },
  setup() {
    const memberStore = useMemberStore();

    return {memberStore}
  },
  data:() => ({
    date: null,
    ko: ko,
    ticketGetRequest: {
      groupId: null,
      studyId: null,
      memberId: null,
      date: null,
      days: null,
    },
    memberTickets: [],
    expiredTickets: [],
    ticketDto: {
      startTime: null,
      endTime: null,
      studyName: null,
      status: null,
    },
    ticketDtos: [],
  }),
  watch: {
    async date() {
      this.initTicketRequest()

      this.memberTickets = await this.ticketGetApiCall()

      console.log(this.memberTickets);

      this.setData()
    }
  },
  async mounted() {
    this.date = new Date()
    this.initTicketRequest()

    this.memberTickets = await this.ticketGetApiCall()

    this.setData()
  },
  methods: {
    initTicketRequest() {
      this.ticketGetRequest.memberId = this.memberStore.getMemberId;

      if(this.date) {
        this.ticketGetRequest.date = this.date.toISOString().substring(0, 10);
      } else {
        this.ticketGetRequest.date = new Date().toISOString().substring(0, 10);
      }

      if(this.selectedStudy) {
        this.ticketGetRequest.studyId = this.selectedStudy.studyId;
      }

      if(this.times.startTime) {
        this.ticketGetRequest.startDate = moment(this.times.startTime).format().substring(0, 10);

        let millis = this.times.endTime.getTime() - this.times.startTime.getTime();
        this.ticketGetRequest.days = millis / (1000 * 3600 * 24) + 1;
      }
    },
    async ticketGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/tickets", {
          params: this.ticketGetRequest
        });

        return response.data.data;
      }
      catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
        console.log(err);
      }
    },
    setData() {
      this.ticketDtos = []

      this.expiredTickets = this.memberTickets[0].expiredTickets

      console.log(this.expiredTickets)

      this.expiredTickets.forEach(expiredTicket => {
        this.ticketDto = {
          startTime: expiredTicket.startTime.substring(11, 16),
          endTime: expiredTicket.endTime.substring(11, 16),
          studyName: expiredTicket.study ? expiredTicket.study.name : "휴식",
          status: expiredTicket.status,
        }

        this.ticketDtos.push(this.ticketDto)
      })
    },
    getColor(status) {
      if(status === "STUDY") {
        return "pink"
      } else {
        return "teal-lighten-3"
      }
    },
    getStudyNameOrRest(ticket) {
      if(ticket.status === "STUDY") {
        return ticket.studyName
      } else {
        return "휴식";
      }
    },
  }
}
</script>

<style scoped>
.gap-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.date-picker {
  width: 60%;
  align-self: center;
}
</style>