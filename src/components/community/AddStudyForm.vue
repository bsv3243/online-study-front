<template>
  <v-card>
    <v-card-title>
      {{ formTitle }}
    </v-card-title>
    <v-card-text>
      <div class="info">
        <div class="info-inner">
          <icon-info/>
          <span>공부가 검색되지 않을 경우 직접입력 해주시길 바랍니다.</span>
        </div>
      </div>
      <div class="div-form d-flex">
        <input v-model="studiesGetRequest.name" @keyup.enter="searchStudy" placeholder="두 글자 이상 입력해주세요.">
        <button @click="searchStudy"><icon-search/></button>
      </div>
      <v-chip-group
          v-model="selectedStudy"
          v-if="dataReady"
          multiple>
        <v-chip
            v-for="study in studies"
            :key="study.id" @click="addStudy(study)">
          # {{study.name}}
        </v-chip>
      </v-chip-group>
      <v-divider class="mb-3"/>
      <div class="direct-form">
        <span>직접 입력</span>
        <input class="form" v-model="studyCreateRequest.name"/>
        <v-btn @click="createStudy">확인</v-btn>
      </div>
      <v-divider class="my-3"/>
      <div>
        <span>선택된 태그</span>
        <v-chip-group
            v-if="dataReady"
            multiple>
          <v-chip
              v-for="study in selectedStudies"
              :key="study.id" @click="deleteStudy(study)"
              closable>
            # {{study.name}}
          </v-chip>
        </v-chip-group>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="closeDialog">
        취소
      </v-btn>
      <v-btn @click="emitData">
        추가하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import IconInfo from "@/components/icons/IconInfo";
import IconSearch from "@/components/icons/IconSearch";
import {useLoginStore} from "@/store/LoginStore";

export default {
  name: "AddStudyForm",
  props: {
    formTitle: String,
    postStudies: Array
  },
  components: {
    IconInfo,
    IconSearch
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data:() => ({
    showDialog: false,
    selectedStudy: [],
    selectedStudies: [],
    studiesGetRequest: {
      page: 0,
      size: 10,
      memberId: null,
      name: "",
    },
    studyCreateRequest: {
      name: "",
    },
    studies: [],
    dataReady: false
  }),
  watch: {
  },
  async mounted() {
    this.studiesGetRequest.memberId = this.loginStore.getMemberId;
    this.studies = await this.studiesGetApiCall()
    this.selectedStudies = this.postStudies

    this.dataReady = true;
  },
  methods: {
    addStudy(study) {
      if(!this.selectedStudies.includes(study)) {
        this.selectedStudies.push(study)
      }
    },
    deleteStudy(study) {
      const idx = this.selectedStudies.indexOf(study);
      this.selectedStudies.splice(idx, 1)
    },
    emitData() {
      this.$emit('studies', this.selectedStudies);
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('showDialog', false);
    },
    async searchStudy() {
      this.studiesGetRequest.memberId = null;
      this.studiesGetRequest.date = null;
      this.studiesGetRequest.days = null;
      console.log(this.studiesGetRequest)
      this.studies = await this.studiesGetApiCall()

      console.log(this.selectedStudies)
    },
    async createStudy() {
      const studyId = await this.studyCreateApiCall();

      const study = {
        studyId: studyId,
        name: this.studyCreateRequest.name
      }

      this.studies.push(study)
    },
    async studiesGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/studies", {
          params: this.studiesGetRequest
        });

        return response.data.data;
      } catch (err) {
        console.log(err);
      }

    },
    async studyCreateApiCall() {
      try {
        const response = await this.axios.post("/api/v1/studies", this.studyCreateRequest);

        return response.data.data
      } catch (err) {
        console.log(err);
      }
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