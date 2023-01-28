<template>
  <v-sheet min-height="90vh">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card height="300">
            <v-container>
              총 공부시간 합산 차트
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card height="300">
            공부시간 차트
            <StackedBarChart/>
          </v-card>
        </v-col>
        <v-col>
          <v-card height="300">
            공부 시작 종료 시간 차트
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import StackedBarChart from "@/components/record/StackedBarChart";
export default {
  name: "RecordList",
  components: {StackedBarChart}
}
</script>

<style scoped>

</style>