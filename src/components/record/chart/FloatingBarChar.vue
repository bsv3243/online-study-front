<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      v-if="dataReady"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "FloatingBarChar",
  components: { Bar },
  props: {
    memberTicket: Object,
    request: Object,
  },
  data: () => ({
    dataReady: false,
    chartData: {
      labels: ['01-27', '01-28', '01-29'],
      datasets: [
        {
          label: "데이터셋1",
          data: [[3600, 12000], [5000, 13200], [4600, 14200]],
          backgroundColor: "#bb7e7e",
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 3600*5,
          ticks: {
            callback: function (v) {
              const date = new Date(0);
              date.setTime(0)
              date.setHours(date.getHours()-9)
              date.setSeconds(v)

              let hours = date.getHours();
              let minutes = date.getMinutes();


              if(hours < 10) {
                hours = "0" + hours
              }
              if(minutes < 10) {
                minutes = "0" +minutes
              }

              return hours + "시 " + minutes + "분";
            },
            stepSize: 3600*2,
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const index = tooltipItem.dataIndex;
              const data = tooltipItem.dataset.data[index];
              const date = new Date((data[1] - data[0]) * 1000);

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
    this.setData()
  },
  methods: {
    setData() {
      //라벨 별로 날짜를 구한다.
      const date = this.request.date;
      const labels = [];
      for(let i=1; i<=this.request.days; i++) {
        date.setDate(date.getDate()+1);
        const fullYear = date.getFullYear();
        let month = date.getMonth()+1;
        let monthDate = date.getDate();

        if(month < 10) {
          month = "0" + month;
        }
        if(monthDate < 10) {
          monthDate = "0" + monthDate;
        }

        labels.push(fullYear + "-" + month + "-" + monthDate)
      }

      const expiredTickets = this.memberTicket.expiredTickets;
      const startTimeMap = new Map();
      const endTimeMap = new Map();
      for(const ticket of expiredTickets) {
        //날짜를 구한다.
        const ticketStartTime = new Date(ticket.startTime.substring(0, 19));
        const ticketEndTime = new Date(ticket.endTime.substring(0, 19));
        const dateStr = this.getKey(ticketStartTime)

        //더 작은 시작 시간, 더 큰 종료 시간을 구한다.
        let startTime = this.getOrDefaultStartTime(startTimeMap, dateStr, ticketStartTime);
        let endTime = this.getOrDefaultEndTime(endTimeMap, dateStr, ticketEndTime);

        startTime = startTime < ticketStartTime.getTime() ? startTime : ticketStartTime.getTime();
        endTime = endTime > ticketEndTime.getTime() ? endTime : ticketEndTime.getTime();

        startTimeMap.set(dateStr, startTime);
        endTimeMap.set(dateStr, endTime);
      }

      //라벨과 데이터를 설정한다.
      const data = [];
      let idx = 0;
      for(const label of labels) {
        const date = new Date(label);

        date.setHours(5)


        const startTime = this.getOrDefault(startTimeMap, this.getKey(date), date);
        const endTime = this.getOrDefault(endTimeMap, this.getKey(date), date);

        const startTimeSeconds = Math.floor((startTime - date.getTime())/1000);
        const endTimeSeconds = Math.floor((endTime - date.getTime())/1000);

        labels[idx] = label.substring(6, 10)
        data.push([startTimeSeconds+3600*5, endTimeSeconds+3600*5])
        idx++;
      }

      this.chartData.datasets[0].label = "공부 시작/종료 시간"
      this.chartData.datasets[0].data = data;
      this.chartData.labels = labels


      this.dataReady = true;
    },
    getOrDefault(map, key, date) {
      if(map.has(key)) {
        return map.get(key);
      } else {
        return date.getTime();
      }
    },
    getOrDefaultStartTime(map, key, time) {
      if(map.has(key)) {
        return map.get(key);
      } else {
        return time;
      }
    },
    getOrDefaultEndTime(map, key, time) {
      if(map.has(key)) {
        return map.get(key);
      } else {
        return time;
      }
    },
    getKey(date) {
      if(date.getHours() < 4) {
        date.setDate(date.getDate()-1)
      }
      const fullYear = date.getFullYear();
      let month = date.getMonth()+1;
      let monthDate = date.getDate();

      if(month < 10) {
        month = "0" + month;
      }
      if(monthDate < 10) {
        monthDate = "0" + monthDate;
      }

      return fullYear + "-" + month + "-" + monthDate
    }
  }
}

</script>

<style scoped>

</style>