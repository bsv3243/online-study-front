<template>
  <Pie
      id="pie-chart"
      :options="chartOptions"
      :data="chartData"
      v-if="dataReady"/>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: "PieChart",
  components: { Pie },
  props: {
    studyRecords: Array
  },
  data: () => ({
    dataReady: false,
    chartData: {
      labels: ['spring', 'vue.js', '휴식'],
      datasets: [
        {
          label: "데이터셋1",
          data: [37405, 13627, 5324],
          backgroundColor: "#bb7e7e",
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const index = tooltipItem.dataIndex;
              const data = tooltipItem.dataset.data[index];
              // const label = tooltipItem.label;
              const date = new Date(data * 1000);

              const hours = date.getHours() - 9;
              const minutes = date.getMinutes();
              return hours + "시간 " + minutes + "분";
            }
          }
        }
      }
    }
  }),
  mounted() {
    this.setDataSet()
  },
  methods: {
    setDataSet() {
      const labels = [];
      const data = [];
      this.studyRecords.forEach(studyRecord => {
        let studyTime = this.getStudyTime(studyRecord);
        labels.push(studyRecord.studyName);
        data.push(studyTime);
      })

      this.chartData.labels = labels
      this.chartData.datasets[0].data = data

      this.dataReady = true;

      console.log(this.chartData)
    },
    getStudyTime(studyRecord) {
      let studyTime = 0;
      studyRecord.records.forEach(record => {
        studyTime += record.studyTime;
      })
      return studyTime;
    },
    getLabels() {

    },
    getOrDefault(map, key) {
      if(map.has(key)) {
        return map.get(key);
      } else {
        return 0;
      }
    }
  }

}
</script>

<style scoped>

</style>