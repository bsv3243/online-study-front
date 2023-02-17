<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830px">
      <div class="d-flex flex-column">
        <div class="pt-5">
          <v-btn variant="outlined">
            목록
          </v-btn>
        </div>
        <div class="border-b pb-5">
          <p class="title">제목 이렇게 적는것 맞나요?</p>
          <p class="writer">작성자</p>
          <div class="d-flex">
            <p class="date">작성일 2023-02-06</p>
            <div class="d-flex pl-2">
              <SvgIcon type="mdi" :path="mdiEyeOutline"/>
              <p>300</p>
            </div>
          </div>
        </div>
        <div class="py-5">
          글 내용
        </div>
        <div>
          <v-chip-group>
            <v-chip v-for="tag in tags" :key="tag.id" class="pa-2" label>
              # {{tag.title}}
            </v-chip>
          </v-chip-group>
        </div>
        <div>
          댓글
          <div>
            닉네임
          </div>
          <div class="d-flex">
            <textarea class="comment-form" rows="3"></textarea>
            <v-btn variant="outlined" class="comment-btn">
              작성
            </v-btn>
          </div>
        </div>
      </div>
      </v-responsive>
    </v-sheet>
  </v-responsive>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiEyeOutline } from '@mdi/js'

export default {
  name: "CommunityPost",
  components: { SvgIcon},
  data:() => ({
    mdiEyeOutline,
    tags: [
      {
        id: 1,
        title: "spring"
      },
      {
        id: 2,
        title: "vue.js"
      }
    ]
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap');
p {
  font-family: "Noto Sans KR",serif;
}
.title {
  font-size: 28px;
  font-weight: 500;
}
.comment-form {
  border: 1px solid #ced4da;
  border-radius: 5px;
  width: 100%;
}
.comment-form:focus {
  outline: none;
}
.comment-btn {
  height: inherit;
}
</style>