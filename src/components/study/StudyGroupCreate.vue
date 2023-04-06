<template>
  <v-btn @click="btnClick">그룹 만들기</v-btn>
  <v-dialog
      v-model="showDialog"
      max-width="350">
<!--    <template v-slot:activator="{ props }">-->
<!--      <v-btn v-bind="props" @click="btnClick">그룹 만들기</v-btn>-->
<!--    </template>-->
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
import {useLoginStore} from "@/store/LoginStore";

export default {
  name: "StudyGroupCreate",
  watch: {
    groupCreateRequest() {
      console.log(this.groupCreateRequest)
    }
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore};
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
        title: "취업",
        value: "JOB"
      },
      {
        title: "대학생",
        value: "UNIV",
      },
      {
        title: "고등학생",
        value: "HIGH"
      },
      {
        title: "어학",
        value: "LANG"
      },
      {
        title: "자격증",
        value: "CERT"
      },
      {
        title: "IT",
        value: "IT"
      },
      {
        title: "공무원",
        value: "GOV"
      },
      {
        title: "독서",
        value: "BOOK"
      },
      {
        title: "기타",
        value: "ETC"
      }
    ],
    headcount: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  }),
  methods: {
    btnClick() {
      if(!this.loginStore.isLogin) {
        alert("로그인 후 이용 가능합니다.");
        this.loginStore.setLoginDialog(true);
      } else {
        this.showDialog=true
      }
    },
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
        const response = await this.axios.post("/api/v1/groups", this.groupCreateRequest);
        const groupId = response.data.data;
        this.$router.push("/group/" + groupId);
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