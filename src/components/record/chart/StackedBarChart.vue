<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData" v-if="dataReady"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "StackedBarChart",
  components: { Bar },
  props: {
    studyRecords: Array,
  },
  data: () => ({
    dataReady: false,
    chartData: {
      labels: ['01-27', '01-28', '01-29', '01-30', '01-31', '02-01', '02-02'],
      datasets: [
        {
          label: "데이터셋1",
          data: [3600 * 3, 3600 * 2, 3600 * 4, 3600 * 2.8, 3600 * 3.2, 3600 * 2.4, 3600 * 3.5],
          backgroundColor: "#bb7e7e",
        },
        {
          label: "데이터셋2",
          data: [3600, 3600 * 2, 3600 * 1.5, 3600 * 1.6, 3600 * 0.8, 3600 * 1.2, 3600 * 1.4],
          backgroundColor: "#eeba36"
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true,
          ticks: {
            callback: (v) => {
              return new Date(v * 1000).toISOString().substring(11, 19);
            },
            stepSize: 120 * 60
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const index = tooltipItem.dataIndex;
              const data = tooltipItem.dataset.data[index];
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
    this.setLabels()
    this.setData()
    this.dataReady = true

    console.log(this.chartData)
  },
  methods: {
    setData() {
      console.log(this.studyRecords)
      const datasets = []
      this.studyRecords.forEach(studyRecord => {

        const label = studyRecord.studyName
        const dataset = []
        studyRecord.records.forEach(record => {
          dataset.push(record.studyTime)
        })

        datasets.push({label:label, data:dataset})
      })

      this.chartData.datasets = datasets
    },
    setLabels() {
      let labels = []
      if(this.studyRecords.length > 0) {
        const dates = this.studyRecords[0].records.map(record => record.date);

        labels = dates.map(date => date.substring(6));
      }
      else {
        const date = new Date();
        for(let i=6; i>=0; i--) {
          date.setDate(date.getDate() - i);
          let month = date.getMonth();
          let monthDate = date.getDate();

          if (month < 10) {
            month = "0" + month;
          }
          if (monthDate < 10) {
            monthDate = "0" + monthDate;
          }

          labels.push(month + "-" + monthDate)
        }
      }

      this.chartData.labels = labels
    },
  }
}
</script>

<style scoped>

</style>