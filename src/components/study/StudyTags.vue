<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <v-form>
            <v-text-field v-model="studiesGetRequest.name"
                          @keyup.enter="studiesGetApiCall"
                          label="태그"
                          variant="outlined"
                          density="compact">

            </v-text-field>
            <v-text-field style="display: none"/>
          </v-form>
          <v-chip-group
              v-model="selected"
              column
              multiple v-if="dataReady">
            <v-chip
              v-for="tag in studies"
              :key="tag.id"
              variant="outlined"
              size="small"
              @click="emitData(this.selected)"
              filter>
              # {{tag.name}}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "StudyTags",
  data: () => ({
    tags: [
      {
        id: 1,
        title: "spring"
      },
      {
        id: 2,
        title: "테스트1"
      },
      {
        id: 3,
        title: "vue.js"
      },
      {
        id: 5,
        title: "테스트2"
      }
    ],
    selected: [], //칩은 인덱스를 반환한다.

    //axios
    //request
    studiesGetRequest: {
      page: 0,
      size: 10,
      name: "",
      date: null, //yyyy-MM-dd
      days: null
    },
    //response
    studies: Array,
    study: {
      studyId: 1,
      name: "study",
      studyTime: 1000,
      startTime: "string",
      endTime: "string"
    },
    //complete
    dataReady: false,
  }),
  watch: {
    selected() {
      const arr = []
      for(const idx of this.selected) {
        arr.push(this.studies[idx].studyId)
      }
      this.emitData(arr)
    }
  },
  async mounted() {
    await this.studiesGetApiCall()

    this.dataReady = true;
  },
  methods: {
    emitData(data) {
      this.$emit("studyIds", data);
    },
    //axios
    async studiesGetApiCall() {
      if(this.studiesGetRequest.name.trim().length <= 0) {
        this.studiesGetRequest.name = null
      }
      try {
        const response = await this.axios.get("/api/v1/studies", {
          params: {
            page: this.studiesGetRequest.page,
            size: this.studiesGetRequest.size,
            name: this.studiesGetRequest.name,
            date: null,
            days: null
          }
        });

        this.studies = response.data.data
        console.log(this.studies)
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>

</style>