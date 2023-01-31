<template>
  <v-sheet min-height="90vh">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3">
              총 공부시간 합산 차트
            <v-card-text>
              <PieChart/>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부시간 차트
            <div style="height: 30vh">
              <StackedBarChart/>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-3" min-height="35vh">
            공부 시작 종료 시간 차트
            <div style="height: 30vh">
            <FloatingBarChar/>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import StackedBarChart from "@/components/record/StackedBarChart";
import FloatingBarChar from "@/components/record/chart/FloatingBarChar";
import PieChart from "@/components/record/chart/PieChart";
export default {
  name: "RecordList",
  components: {PieChart, FloatingBarChar, StackedBarChart}
}
</script>

<style scoped>

</style>