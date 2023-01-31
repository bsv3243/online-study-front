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
  name: "StackedBarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ '2023-01-27', '2023-01-28', '2023-01-29' ],
        datasets: [
            {
              label: "데이터셋1",
              data: [3600*3, 3600*2, 3600*4],
              backgroundColor: "#bb7e7e",
            },
          {
            label: "데이터셋2",
            data: [3600, 3600*2, 3600*1.5],
            backgroundColor: "#eeba36"
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            ticks: {
              callback: (v) => {
                return new Date(v*1000).toISOString().substring(11, 19);
              },
              stepSize: 120*60
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const index = tooltipItem.dataIndex;
                const data = tooltipItem.dataset.data[index];
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
  }
}
</script>

<style scoped>

</style>