<template>
  <Pie
      id="pie-chart"
      :options="chartOptions"
      :data="chartData"/>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
  name: "PieChart",
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [ 'spring', 'vue.js', '휴식' ],
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
                const date = new Date(data*1000);

                const hours = date.getHours()-9;
                const minutes = date.getMinutes();
                return hours + "시간 " + minutes + "분";
              }
            }
          }
        }
      }
    }
  },
}
</script>

<style scoped>

</style>