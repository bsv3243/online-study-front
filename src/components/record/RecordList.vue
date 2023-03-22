<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3">
              총 공부시간 합산 차트
            <v-card-text>
              <PieChart :study-records="studyRecords" v-if="dataReady && isRecordExist" :key="chartKey"/>
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
              <StackedBarChart :study-records="studyRecords" v-if="dataReady && isRecordExist" :key="chartKey"/>
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
              <scatter-chart :study-records="studyRecords" v-if="dataReady && isRecordExist" :key="chartKey"/>
              <div class="d-flex justify-center align-center h-100">
                <p v-if="!isRecordExist">데이터 없음</p>
              </div>
            </div>
          </v-card>
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

export default {
  name: "RecordList",
  components: {ScatterChart, PieChart, StackedBarChart},
  props: {
    times: Object,
    selectedStudy: Object
  },
  watch: {
      async selectedStudy() {
        if(this.selectedStudy) {
          this.recordGetRequest.studyId = this.selectedStudy.studyId
        } else {
          this.recordGetRequest.studyId = null;
        }

        await this.recordGetApiCall()

        this.isRecordExist = this.studyRecords.length !== 0;

        this.chartKey++;
      },
    async times() {
      console.log(this.times)

      this.recordGetRequest.memberId = this.loginStore.getMemberId
      this.recordGetRequest.startDate = moment(this.times.startTime).format().substring(0, 10);

      console.log(this.recordGetRequest)

      let millis = this.times.endTime.getTime() - this.times.startTime.getTime();
      this.recordGetRequest.days = millis / (1000 * 3600 * 24) + 1;

      await this.recordGetApiCall()

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
    this.recordGetRequest.memberId = this.loginStore.getMemberId
    await this.recordGetApiCall()

    this.isRecordExist = this.studyRecords.length !== 0;

    this.dataReady = true;
  },
  data:() => ({
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
    //complete
    dataReady: false,
  }),
  methods: {
    async recordGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/records", {
          params: this.recordGetRequest
        });

        this.studyRecords = response.data.data

        console.log(this.studyRecords)
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