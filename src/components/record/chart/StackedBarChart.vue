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
    memberTicket: Object,
    ticketGetRequest: Object,
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
    this.setData()
  },
  methods: {
    setData() {
      const date = this.ticketGetRequest.date;

      //라벨 날짜 별로 지정
      const labels = [];
      for(let i=1; i<=this.ticketGetRequest.days; i++) {
        let month = date.getMonth()+1;
        let monthDate = date.getDate()+i;

        if(month < 10) {
          month = "0" + month;
        }
        if(monthDate < 10) {
          monthDate = "0" + monthDate;
        }

        labels.push(month + "-" + monthDate)
      }

      //스터디별 분류를 위해 스터디를 추출
      const expiredTickets = this.memberTicket.expiredTickets;
      const filter = expiredTickets.map(ticket => ticket.study.name);
      const studiesSet = new Set(filter);

      //ticket 의 스터디 별로 map<날짜, 초>에 삽입
      const restMap = new Map();
      this.chartData.datasets = [];
      for(const studyName of studiesSet) {
        const map = new Map();
        for(const ticket of expiredTickets) {
          if(ticket.study.name === studyName) {
            const key = this.getKey(new Date(ticket.startTime.substring(0, 19)));
            const value = this.getOrDefault(map, key);

            if(ticket.status === "STUDY") {
              map.set(key, value + ticket.activeTime);
            } else if(ticket.status === "REST") {
              restMap.set(key, value + ticket.activeTime);
            }
          }
        }

        //날짜 순으로 data 를 생성
        const data = []
        for(const label of labels) {
          const value = this.getOrDefault(map, label);
          data.push(value);
        }

        const dataset = {
          label: studyName,
          data: data,
          backgroundColor: "#e8e8e8"
        }

        //datasets 에 data 를 삽입
        this.chartData.datasets.push(dataset);
      }

      this.chartData.labels = labels

      if(studiesSet.size === 0) {
        let array = [];
        array.fill(0, 0, this.ticketGetRequest.days)
        const dataset = {
          label: "데이터 없음",
          data: array,
          backgroundColor: "#e8e8e8"
        }

        this.chartData.datasets = [dataset]
      }


      this.dataReady = true;
    },
    getOrDefault(map, key) {
      if(map.has(key)) {
        return map.get(key);
      } else {
        return 0;
      }
    },
    getKey(date) {
      if(date.getHours() < 4) {
        date.setDate(date.getDate()-1)
      }
      let month = date.getMonth()+1;
      let monthDate = date.getDate();

      if(month < 10) {
        month = "0" + month;
      }
      if(monthDate < 10) {
        monthDate = "0" + monthDate;
      }

      return month + "-" + monthDate
    }
  }
}
</script>

<style scoped>

</style>