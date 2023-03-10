<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false">
    <template v-slot:activator="{props}">
      <v-btn v-bind="props">
        변경
      </v-btn>
    </template>
    <v-card class="pa-2" min-width="300">
      <!--                <v-form>-->
      <!--                  <v-text-field label="검색" density="compact" variant="solo">-->
      <!--                  </v-text-field>-->
      <!--                </v-form>-->

      <v-list
          nav>
        <v-list-item
            v-for="study in studies"
            :key="study.studyId"
            :value="study.id"
            @click="emitData('study', study)"
            active-color="primary"
        >
          <v-list-item-title>{{study.name}}</v-list-item-title>
          <v-list-item-subtitle>{{getStudyTime(study.studyTime)}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-btn variant="text">
          닫기
        </v-btn>
        <v-spacer/>
        <AddStudyDialog :studies="studies" @selectedStudy="addStudy"/>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import AddStudyDialog from "@/components/study/group/AddStudyDialog";

export default {
  name: "SelectStudyMenu",
  components: {
    AddStudyDialog
  },
  data:() => ({
    menu: false,
    showDialog: false,
    selectedStudy: [],

    //axios
    //request
    studiesGetRequest: {
      page: 0,
      size: 10,
      name: null,
      date: null,
      days: 1,
    },
    //response
    studies: [
      {
        studyId: 1,
        name: "테스트",
        studyTime: 3600,
        startTime: new Date(),
        endTime: new Date()
      }
    ],
    //axios complete
    dataReady: false,
  }),
  async mounted() {
    const response = await this.studiesGetApiCall();

    this.studies = response.data


    const studies = this.getStudiesFromCookie("studies");


    for(const study of studies) {
      if(!this.studies.some(o => o.studyId===study.studyId)) {
        this.studies.push(study)
      }
    }

    this.dataReady = true;
  },
  methods: {
    emitData(str, data) {
      this.$emit(str, data);
    },
    async studiesGetApiCall() {
      let date = new Date();
      if(date.getHours()<4) { //하루의 시작은 5시
        date.setDate(date.getDate()-this.studiesGetRequest.days);
      }
      try {
        const response = await this.axios.get("http://localhost:8080/api/v1/studies", {
          params: {
            page: this.studiesGetRequest.page,
            size: this.studiesGetRequest.size,
            name: this.studiesGetRequest.name,
            date: date.toISOString().substring(0, 10),
            days: this.studiesGetRequest.days
          }
        });

        // this.studies = response.data.data


        return response.data;
      } catch (err) {
        console.log("잠시 후에 다시 시도해주세요.")
      }
    },
    getStudiesFromCookie(str) {
      if(this.$cookies.isKey(str)) {
        const value = this.$cookies.get(str);
        return value
      } else {
        return []
      }
    },
    getStudyTime(time) {
      let hours;
      let mins;
      if(time === undefined) {
        hours = 0;
        mins = 0;
      } else {
        hours = Math.floor(time / 3600);
        mins = Math.floor((time / 60) % 60);
      }



      return hours + "시간 " + mins + "분"
    },
    addStudy(value) {
      this.studies.push(value)
    }
  }
}
</script>

<style scoped>

</style>