<template>
  <scatter
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData" v-if="dataReady"></scatter>
</template>

<script>
import { Scatter } from 'vue-chartjs'
import {   Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend } from 'chart.js'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
export default {
  name: "ScatterChart",
  components: {
    Scatter
  },
  props: {
    studyRecords: Array,
  },
  mounted() {
    this.setLabels()
    this.setData()


    this.dataReady = true
  },
  data: () => ({
    dataReady: false,
    today: new Date(),
    chartData: {
      datasets: [
        {
          label: "데이터셋1",
          data: [{y:3600 * 3, x:0}, {y:3600 * 2, x:1}, {y:3600 * 4,x:2}, {y:3600 * 2.8,x:3},
            {y:3600 * 3.2,x:4}, {y:3600 * 2.4,x:5}, {y:3600 * 3.5, x:6}],
          backgroundColor: "#bb7e7e",
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            callback: (v) => {
              const date = new Date(v);
              let month = date.getMonth()+1;
              let monthDate = date.getDate();

              if(month < 10) {
                month = "0" + month;
              }
              if(monthDate < 10) {
                monthDate = "0" + monthDate;
              }

              return month + "-" + monthDate
            },
            stepSize: 3600*24*1000
          }
        },
        y: {
          min: new Date("1970-01-01 05:00:00 +09:00").getTime(),
          max: new Date("1970-01-02 05:00:00 +09:00").getTime(),
          ticks: {
            callback: (v) => {
              const date = new Date(v);
              return date.toTimeString().substring(0, 8);
            },
            stepSize: 3600*3*1000
          },
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const index = tooltipItem.dataIndex;
              const data = tooltipItem.dataset.data[index].y;
              const date = new Date(data );


              const hours = date.getHours();
              const minutes = date.getMinutes();
              return hours + "시 " + minutes + "분";
            }
          }
        }
      }
    },

  }),
  methods: {
    getDateForChartYaxis() {
      const date = new Date();
      date.setFullYear(1970 , 0, 1);
      date.setHours(5, 0, 0);

      return date;
    },
    setData() {
      //부모 컴포넌트에서 studyRecords 의 길이가 0이면 렌더링 하지 않게 제어 중
      const length = this.studyRecords[0].records.length;

      const startTimeArr = [];
      const endTimeArr = [];
      for(let i=0; i<length; i++) { // length 는 날짜 길이를 뜻한다. 즉, 날짜 길이만큼 루프를 돈다.
        let startTimeMin;
        let endTimeMax;
        let recordDate;

        this.studyRecords.forEach(studyRecord => { // 해당 날짜의 학습 기록들을 대상으로 계산한다.
          recordDate = studyRecord.records[i].date;

          if(studyRecord.records[i].studyTime !== 0) { //해당 일자 공부 기록이 존재하면
            let startTime = this.initDateFromISOString(studyRecord.records[i].startTime);
            let endTime = this.initDateFromISOString(studyRecord.records[i].endTime);

            startTimeMin = this.compareAndChangeMinTime(startTimeMin, startTime);
            endTimeMax = this.compareAndChangeMaxTime(endTimeMax, endTime);

          }
        })

        let startTimePoint;
        let endTimePoint;

        if(startTimeMin) {
          startTimeMin = this.setDateForChart(startTimeMin);
          endTimeMax = this.setDateForChart(endTimeMax);

          startTimePoint = {
            x: new Date(recordDate).getTime(),
            y: startTimeMin.getTime()
          }
          endTimePoint = {
            x: new Date(recordDate).getTime(),
            y: endTimeMax.getTime()
          }
        } else { 
          const point = {
            x: new Date(recordDate).getTime(),
            y: null
          }

          startTimePoint = point;
          endTimePoint = point;
        }

        startTimeArr.push(startTimePoint)
        endTimeArr.push(endTimePoint)
      }

      const startTimeData = {
        label: "공부 시작 시간",
        data: startTimeArr
      };
      const endTimeData = {
        label: "공부 종료 시간",
        data: endTimeArr
      };

      this.chartData.datasets = [startTimeData, endTimeData]
    },
    initDateFromISOString(time) {
      return new Date(time);
    },
    compareAndChangeMinTime(source, target) {
      if(!source) {
        source = target;
      }
      if(source.getTime() > target.getTime()) {
        source = target;
      }

      return source;
    },
    compareAndChangeMaxTime(source, target) {
      if(!source) {
        source = target;

      }
      if (source.getTime() < target.getTime()) {
        source = target;
      }

      return source;
    },
    setDateForChart(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      let monthDate = 1;
      if(hours < 5) {
        monthDate++;
      }

      return new Date(1970, 0, monthDate, hours, minutes, seconds)
    },
    setLabels() {
      if(this.studyRecords.length > 0) {
        const dates = this.studyRecords[0].records.map(record => new Date(record.date).getTime());

        for(const i in this.chartData.datasets[0].data) {
          this.chartData.datasets[0].data[i].x = dates[i]
        }
      }
    },
  }
}
</script>

<style scoped>

</style>