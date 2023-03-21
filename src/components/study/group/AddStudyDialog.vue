<template>
  <v-dialog
      v-model="showDialog"
      persistent
      max-width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        공부 선택
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        공부 검색
      </v-card-title>
      <v-card-text>
        <div class="info">
          <div class="info-inner">
            <icon-info/>
            <span>공부가 검색되지 않을 경우 직접입력 해주시길 바랍니다.</span>
          </div>
        </div>
        <div class="div-form d-flex">
          <input v-model="studiesGetRequest.name" placeholder="두 글자 이상 입력해주세요.">
          <button @keyup.enter="studiesGetApiCall" @click="studiesGetApiCall"><icon-search/></button>
        </div>
        <v-chip-group
            v-model="selectedGroupStudy"
            v-if="dataReady"
            filter>
          <v-chip
              v-for="study in findStudies"
              :key="study.id">
            {{study.name}}
          </v-chip>
        </v-chip-group>
        <v-divider class="mb-3"/>
        <div class="direct-form">
          <span>직접 입력</span>
          <input class="form" v-model="studyCreateRequest.name"/>
          <v-btn @click="studyCreateApiCall">확인</v-btn>
        </div>
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
import IconInfo from "@/components/icons/IconInfo";
import IconSearch from "@/components/icons/IconSearch";

export default {
  name: "AddStudyDialog",
  components:{
    IconInfo,
    IconSearch
  },
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

    //axios
    //get request
    studiesGetRequest: {
      page: 0,
      size: 10,
      name: null,
      date: null,
      days: null
    },
    //create request
    studyCreateRequest: {
      name: null,
    },
    //get response
    findStudies: [
      {
        studyId: 1,
        name: "테스트",
      }
    ],
    //axios complete
    dataReady: false,
  }),
  mounted() {
    this.studiesGetApiCall();
  },
  methods: {
    emitData(data) {
      this.$emit('selectedStudy', data)
    },
    addStudy() {

      const findStudy = this.findStudies[this.selectedGroupStudy];
      this.emitData(findStudy)

      this.addStudyToCookie(findStudy);


      this.selectedGroupStudy = []
      this.showDialog = false;
    },

    async studyCreateApiCall() {
      try {
        const response = await this.axios.post("/api/v1/studies", this.studyCreateRequest);

        const createdStudyId = response.data.data;
        this.findStudies.push({studyId: createdStudyId, name: this.studyCreateRequest.name})
        this.studyCreateRequest.name = null
        return response.data;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
      }
    },
    async studiesGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/studies", {
          params: {
            page: this.studiesGetRequest.page,
            size: this.studiesGetRequest.size,
            name: this.studiesGetRequest.name,
            date: this.studiesGetRequest.date,
            days: this.studiesGetRequest.days
          }
        });

        this.findStudies = response.data.data;
        this.dataReady = true;


        return response.data;
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
      }
    },
    addStudyToCookie(study) {
      if(!this.$cookies.isKey("studies")) {
        this.$cookies.set("studies", JSON.stringify([study]))
      }
      const studies = this.$cookies.get("studies");

      if(studies.some(o => o.studyId===study.studyId)) {
        return;
      }

      studies.push(study);


      this.$cookies.set("studies", JSON.stringify(studies))

/*      const value = JSON.stringify([study]);
      this.$cookies.set("test", value);
      const test = this.$cookies.get("test");
      test.push(study)
      console.log(test)*/
      // if(!this.$cookies.isKey("studies")) {
      //   this.$cookies.set("studies", JSON.stringify(study));
      // } else {
      //   const value = JSON.parse(this.$cookies.get("studies"));
      //   console.log(JSON.parse(this.$cookies.get("studies")))
      //
      //   value.push(study);
      //
      //   this.$cookies.set("studies", JSON.stringify(value));
      // }
    }
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  color: #999999;
}
.info-inner {
  display: flex;
  gap: 0.5rem;
}
.form {
  height: 4vh;
  width: 100%;
  font-size: 16px;
  padding-left: 0.5rem;
  outline: 1px solid #e7e7e7;
}
.form:focus {
  outline: 2px solid #616161;
}
.div-form {
  width: 100%;
  outline: 1px solid #e7e7e7;
  border-radius: 0;
}
.div-form:focus-within {
  outline: 2px solid #616161;
}
.div-form input {
  height: 4vh;
  width: 100%;
  font-size: 16px;
  padding-left: 0.5rem;
}
.div-form input:focus {
  outline: none;
}
.div-form button:hover {
  background-color: inherit;
}
.direct-form {
  display: flex;
  align-content: center;
  gap: 1rem;
}
.direct-form span {
  display: flex;
  align-self: center;
  white-space: nowrap;
}
</style>