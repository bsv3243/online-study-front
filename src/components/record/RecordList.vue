<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <div class="record-container">
            <v-card class="pa-3">
              <strong>총 학습 시간</strong>
              <v-card-text>
                <PieChart :study-records="studyRecords" v-if="dataReady && isRecordExist" :key="chartKey"/>
                <div class="d-flex justify-center align-center h-100">
                  <p v-if="!isRecordExist">데이터 없음</p>
                </div>
              </v-card-text>
            </v-card>
            <v-card class="pa-3" min-height="35vh">
              <strong>개별 학습 시간</strong>
              <div style="height: 30vh">
                <StackedBarChart :study-records="studyRecords"
                                 :study-records-others="studyRecordsOthers"
                                 v-if="dataReady && isRecordExist" :key="chartKey"/>
                <div class="d-flex justify-center align-center h-100">
                  <p v-if="!isRecordExist">데이터 없음</p>
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="record-container">
            <v-card class="pa-3" min-height="35vh">
              <strong>학습 시작 종료 시간</strong>
              <div style="height: 30vh">
                <scatter-chart :study-records="studyRecords" v-if="dataReady && isRecordExist" :key="chartKey"/>
                <div class="d-flex justify-center align-center h-100">
                  <p v-if="!isRecordExist">데이터 없음</p>
                </div>
              </div>
            </v-card>
            <v-container class="pa-3">
              <div style="height: 39vh">

                <record-time-line :times="times" :selected-study="selectedStudy"/>
              </div>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import StackedBarChart from "@/components/record/chart/StackedBarChart";
import PieChart from "@/components/record/chart/PieChart";
import {useMemberStore} from "@/store/MemberStore";
import {useLoginStore} from "@/LoginStore";
import ScatterChart from "@/components/record/chart/ScatterChart";
import moment from "moment";
import RecordTimeLine from "@/components/record/RecordTimeline";

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {ko} from 'date-fns/locale'

export default {
  name: "RecordList",
  components: {RecordTimeLine, ScatterChart, PieChart, StackedBarChart, VueDatePicker},
  props: {
    times: Object,
    selectedStudy: Object
  },
  watch: {
    async selectedStudy() {
      if (this.selectedStudy) {
        this.recordGetRequest.studyId = this.selectedStudy.studyId
      } else {
        this.recordGetRequest.studyId = null;
      }

      this.recordGetRequest.memberId = this.memberStore.getMemberId;
      this.studyRecords = await this.recordGetApiCall()

      console.log(this.studyRecords)

      if (this.selectedStudy) { // 특정 스터디가 선택되었을 때 다른 사용자들의 기록을 요청한다.
        this.recordGetRequest.memberId = null;
        this.studyRecordsOthers = await this.recordGetApiCall()
      } else {
        this.studyRecordsOthers = null;
      }

      this.isRecordExist = this.studyRecords.length !== 0;

      this.chartKey++;
    },
    async times() {


      this.recordGetRequest.memberId = this.memberStore.getMemberId;
      this.seStartDateAndDays();
      this.studyRecords = await this.recordGetApiCall();

      this.isRecordExist = this.studyRecords.length !== 0;

      this.chartKey++;
    }
  },
  setup() {
    const memberStore = useMemberStore();
    const loginStore = useLoginStore();

    return {memberStore, loginStore};
  },
  async mounted() {
    this.recordGetRequest.memberId = this.memberStore.getMemberId
    console.log(this.recordGetRequest)
    this.studyRecords = await this.recordGetApiCall()

    this.isRecordExist = this.studyRecords.length !== 0;

    this.dataReady = true;
  },
  data:() => ({
    ko:ko,
    timelineDate: null,
    isRecordExist: true,
    chartKey: 0,
    //axios
    //request
    recordGetRequest: {
      memberId: null,
      groupId: null,
      studyId: null,
      startDate: null,
      days: null,
    },
    //response
    studyRecords: [],
    studyRecordsOthers: [],
    //complete
    dataReady: false,
  }),
  methods: {
    async recordGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/records", {
          params: this.recordGetRequest
        });

        return response.data.data
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
        console.log(err);
      }
    },
    seStartDateAndDays() {
      this.recordGetRequest.startDate = moment(this.times.startTime).format().substring(0, 10);

      let millis = this.times.endTime.getTime() - this.times.startTime.getTime();
      this.recordGetRequest.days = millis / (1000 * 3600 * 24) + 1;
    }
  },
}
</script>

<style scoped>
.record-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.timeline-date-picker {
  width: 60%;
}
</style>