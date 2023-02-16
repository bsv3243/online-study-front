<template>
  <v-responsive class="mx-auto" max-width="1200">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830">
        <div class="write-container">
          <div class="select-container">
            <v-select
                label="카테고리"
                :items="categories"
                item-title="name"
                item-value="name" density="comfortable" variant="outlined">
            </v-select>
          </div>
          <div class="title-container">
            <input class="title-form" placeholder="제목을 입력해주세요."/>
          </div>
            <tiptap/>
          <div class="button-post-write">
            <v-btn variant="outlined">
              취소
            </v-btn>
            <v-btn variant="outlined" class="bg-green-lighten-1">
              글쓰기
            </v-btn>
          </div>
        </div>
      </v-responsive>
    </v-sheet>
  </v-responsive>
</template>

<script>
import Tiptap from "@/components/editor/Tiptap";
export default {
  name: "WritePost",
  components: {Tiptap},
  data:() => ({
    categories: [
      {
        name: "잡담"
      },
      {
        name: "질문"
      },
      {
        name: "정보"
      }
    ]
  })
}
</script>

<style scoped>
tiptap {
}
.select-container {
  margin-top: 40px;
  width: 20%;
}
.write-container {
  display: flex;
  flex-direction: column;
}
.button-post-write {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  float: right;
  justify-content: right;
}
.title-container {
  margin-bottom: 10px;
  display: flex;
}
.title-form {
  height: 5vh;
  width: 100%;
  font-size: 20px;
}
.title-form:focus {
  outline: none;
}
</style>