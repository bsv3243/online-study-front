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
        labels: [ '01-27', '01-28', '01-29', '01-30', '01-31', '02-01', '02-02' ],
        datasets: [
            {
              label: "데이터셋1",
              data: [3600*3, 3600*2, 3600*4, 3600*2.8, 3600*3.2, 3600*2.4, 3600*3.5],
              backgroundColor: "#bb7e7e",
            },
          {
            label: "데이터셋2",
            data: [3600, 3600*2, 3600*1.5, 3600*1.6, 3600*0.8, 3600*1.2, 3600*1.4],
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