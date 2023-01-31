<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "FloatingBarChar",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [
          {
            label: "데이터셋1",
            data: [[20, 40], [30, 40], [12, 57]],
            backgroundColor: "#bb7e7e",
          }
        ]
      },
      chartOptions: {
        responsive: true,
      }
    }
  }
}

</script>

<style scoped>

</style>