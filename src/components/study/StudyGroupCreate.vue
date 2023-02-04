<template>
  <v-dialog
      v-model="showDialog"
      max-width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">그룹 만들기</v-btn>
    </template>
    <v-card>
      <v-card-title>
        그룹 만들기
      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="groupCreateRequest.name"
            variant="underlined"
            label="그룹 이름"></v-text-field>
        <div class="selectGrid">
          <v-select
              v-model="groupCreateRequest.category"
              :items="categories"
              item-title="title"
              item-value="value"
              variant="underlined"
              density="compact"
              label="카테고리">
          </v-select>
              <v-spacer/>
          <v-select
              v-model="groupCreateRequest.headcount"
              :items="headcount"
              variant="underlined"
              density="compact"
              label="인원수">
          </v-select>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="showDialog=false">취소</v-btn>
        <v-btn @click="groupCreateApiCall">만들기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StudyGroupCreate",
  watch: {
  },
  data:() => ({
    showDialog: false,
    groupCreateRequest: {
      name: "",
      category: [],
      headcount: []
    },
    categories: [
      {
        title: "취직",
        value: "JOB"
      },
      {
        title: "대학생",
        value: "UNIV",
      },
      {
        title: "독서",
        value: "BOOK"
      }
    ],
    headcount: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  }),
  methods: {
    async groupCreateApiCall() {
      if(this.groupCreateRequest.name.length < 1 || this.groupCreateRequest.name.length > 20) {
        alert("그룹 이름은 1자 이상, 20자 이하여야 합니다.")
        return;
      }
      if(this.categories.filter(c => c.value === this.groupCreateRequest.category).length === 0) {
        alert("카테고리는 필수입니다.")
        return;
      }
      if(this.groupCreateRequest.headcount instanceof Array || this.groupCreateRequest.headcount > 30 || this.groupCreateRequest.headcount < 1) {
        alert("인원수는 필수입니다.")
        return;
      }

      try{
        const response = await this.axios.post("http://localhost:8080/api/v1/groups", this.groupCreateRequest);
        this.$router.push("/group/" + response.data);
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.selectGrid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
}
</style>