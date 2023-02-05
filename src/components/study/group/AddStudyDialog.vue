<template>
  <v-dialog
      v-model="showDialog"
      persistent
      max-width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        공부 추가
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        공부 추가
      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="newStudy.name"
            density="compact"
            variant="solo"
            label="공부 이름"></v-text-field>
        <v-chip-group
            v-model="selectedGroupStudy"
            filter>
          <v-chip
              v-for="study in groupStudies"
              :key="study.id"
              @click="newStudy.name=''">
            {{study.name}}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="showDialog=false">
          취소
        </v-btn>
        <v-btn @click="addStudy">
          추가하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddStudyDialog",
  props: ['studies'],
  data:() => ({
    showDialog: false,
    groupStudies: [
      {
        id: "3",
        name: "레디스"
      },
      {
        id: "4",
        name: "리액트"
      }
    ],
    selectedGroupStudy: [],
    newStudy: {
      name: ""
    }
  }),
  methods: {
    emitData(data) {
      this.$emit('selectedStudy', data)
    },
    addStudy() {
      if(this.newStudy.name.length === 0) {
        let groupStudy = this.groupStudies[this.selectedGroupStudy]
        groupStudy.time = "0시간 0분"

        if(this.studies.filter(study => study.id===groupStudy.id).length === 0) {
          // this.studies.push(groupStudy)
          this.emitData(groupStudy)
        }

        this.addStudyApiCall(groupStudy.id)
      } else if(this.newStudy.name.length > 0) {

        this.createStudyApiCall()
      }

      this.selectedGroupStudy = []
      this.showDialog = false;
    },

    async createStudyApiCall() {
      try {
        console.log("axios post")
        // const response = await this.axios.post("http://localhost:8080/api/v1/studies", this.newStudy);
        // return response.data;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
      }
    },
    async addStudyApiCall(studyId) {
      try {
        console.log(this.studies)
        console.log("axios post data: ", studyId)
        // await this.axios.post("http://localhost:8080/api/v1/addStudies", studyId);
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
      }
    }
  }
}
</script>

<style scoped>

</style>