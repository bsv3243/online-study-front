<template>
  <v-container>
    <vue-date-picker v-model="date"
                     :format-locale="ko"
                     format="Y-MM-dd"
                     :max-date="new Date()"
                     :enable-time-picker="false"
                     range multi-calendars/>
  </v-container>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {ko} from 'date-fns/locale'
export default {
  name: "RecordSelectDate",
  components: {
    VueDatePicker,
  },
  watch: {
    date() {
      if(!this.date) {
        return;
      }

      const startTime = this.date[0];
      let endTime = this.date[1];

      let number = endTime.getTime()-startTime.getTime();
      number = number/1000;
      if(number > 3600*24*30) {
        alert("최대 30일까지만 선택가능합니다.")
        endTime = new Date(startTime.getTime() + 3600*24*30*1000)
        this.date[1] = endTime
      }

      this.emitData("time", {
        startTime: startTime,
        endTime: endTime
      })
    }
  },
  data:() => ({
    date: {
      value: null,
    },
    ko: ko
  }),
  mounted() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-7);

    let endDate = new Date();

    this.date.value = [startDate, endDate]
  },
  methods: {
    emitData(parent, date) {
      this.$emit(parent, date);
    }
  }
}
</script>

<style scoped>

</style>