<template>
  <div>
    <v-responsive class="mx-auto" max-width="1200px">
      <v-container>
        <v-row>
          <div class="left">
            <RecordSearch @selectedStudy="changeSelectedStudy"/>
          </div>
          <v-col>
            <v-sheet min-height="90vh">
              <div class="date-picker-container">
                <record-select-date @time="changeTimeCondition"/>
              </div>
              <RecordList :times="times" :selected-study="selectedStudy"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
import RecordList from "@/components/record/RecordList";
import RecordSearch from "@/components/record/RecordSearch";
import RecordSelectDate from "@/components/record/RecordSelectDate";
export default {
  name: "AppRecord",
  components: {RecordSelectDate, RecordSearch, RecordList},
  data:() => ({
    times: {
      startTime: null,
      endTime: null
    },
    selectedStudy: null,
  }),
  methods: {
    changeTimeCondition(value) {
      this.times = value
    },
    changeSelectedStudy(value) {
      this.selectedStudy = value
    }
  }
}
</script>

<style scoped>
.left {
  margin-top: 12px;
  width: 200px;
}
.date-picker-container {
  width: 300px;
}
</style>