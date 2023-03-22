<template>
  <v-sheet min-height="200" rounded="lg">
    <v-container>
      <div class="div-form d-flex">
        <input v-model="search" placeholder="검색">
        <button @keyup.enter="studiesGetApiCall" @click="studiesGetApiCall"><icon-search/></button>
      </div>
    <div>
      <v-chip-group
          v-model="select"
          column>
        <v-chip
            v-for="study in studies"
            :key="study.id"
            filter>
          {{study.name}}
        </v-chip>
      </v-chip-group>
    </div>
    </v-container>
  </v-sheet>
</template>

<script>
import IconSearch from "@/components/icons/IconSearch";
import moment from "moment";

export default {
  name: "RecordSearch",
  components: {
    IconSearch
  },
  data:() => ({
    select: [],
    search: "",
    studies: [
      {
        id: 1,
        name: "spring"
      },
      {
        id: 2,
        name: "vue.js"
      },
      {
        id: 3,
        name: "react"
      },
      {
        id: 4,
        name: "unity"
      },
      {
        id: 5,
        name: "unreal"
      }
    ]
  }),
  watch: {
    select() {
      this.$emit("selectedStudy", this.studies[this.select]);
    }
  },
  mounted() {
    this.studiesGetApiCall()
  },
  methods: {
    searchStudies() {
      this.studiesGetApiCall()
    },
    //주간 공부량이 가장 많은 스터디들을 기본으로 가져온다.
    async studiesGetApiCall() {
      const date = this.getDateOfToday()
      let params = {
        page: 0,
        size: 10,
        name: this.search,
        date: moment(date).format().substring(0, 10)
      }

      if(this.search) {
        params.date = null;
      }

      try {
        const response = await this.axios.get("/api/v1/studies", {
          params: params
        });

        this.studies = response.data.data
        console.log(this.studies)
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
        console.log(err)
      }
    },
    getDateOfToday() {
      const date = new Date();
      if(date.getHours() < 5) {
        date.setDate(date.getDate()-1);
      }
      return date;
    }
  }
}
</script>

<style scoped>
.direct-form span {
  display: flex;
  align-self: center;
  white-space: nowrap;
}
.div-form {
  width: 100%;
  outline: 1px solid #e7e7e7;
  border-radius: 5px;
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
</style>