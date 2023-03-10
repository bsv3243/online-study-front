<template>
  <v-responsive class="mx-auto" max-width="1200">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830">
        <div class="write-container">
          <div class="select-container">
            <v-select
                label="카테고리"
                :items="categories"
                v-model="postCreateRequest.category"
                item-title="name"
                item-value="value" density="comfortable" variant="outlined">
            </v-select>
          </div>
          <div class="title-container">
            <input class="title-form" placeholder="제목을 입력해주세요." v-model="this.postCreateRequest.title"/>
          </div>
            <tiptap @content="contentUpdate"/>
          <div class="post-bottom">
            <div>
              <v-dialog
                  v-model="selectTagsDialog"
                  max-width="350">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="outlined">태그 선택</v-btn>
                </template>
                <v-card max-width="350">
                  <v-card-title>
                    태그 선택
                  </v-card-title>
                  <v-card-text>
                    <v-chip-group
                        v-model="selectedTags"
                        selected-class="text-amber-darken-1" column multiple>
                      <v-chip v-for="tag in studies" :key="tag.id">
                        # {{tag.title}}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                  <div class="pa-2">
                    <v-btn class="float-right" variant="text" @click="selectTagsDialog=false">확인</v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </div>
            <div class="button-post-write">
              <v-btn variant="outlined">
                취소
              </v-btn>
              <v-btn variant="outlined" class="bg-green-lighten-1" @click="postCreateApiCall">
                글쓰기
              </v-btn>
            </div>
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
    selectTagsDialog: false,
    categories: [
      {
        name: "잡담",
        value: "CHAT"
      },
      {
        name: "질문",
        value: "QUESTION"
      },
      {
        name: "정보",
        value: "INFO"
      }
    ],
    studies: [
      {
        id: 1,
        title: "spring"
      },
      {
        id: 2,
        title: "vue.js"
      }
    ],
    selectedTags: [],
    content: null,

    //axios
    //api call complete
    dataReady: false,

    //request
    postCreateRequest: {
      title: null,
      content: null,
      category: null,
      studyIds: null,
      groupId: null,
    }
  }),
  mounted() {
    this.postCreateRequest.groupId = this.$route.params.groupId
  },
  watch: {
    content() {
      this.postCreateRequest.content = this.content
    }
  },
  methods: {
    contentUpdate(content) {
      this.content = content;
    },
    async postCreateApiCall() {
      if(this.postCreateRequest.title.length < 1) {
        alert("제목은 공란일 수 없습니다.")
        return;
      }
      if(this.postCreateRequest.content.length < 1) {
        alert("본문은 공란일 수 없습니다.");
        return;
      }
      if(this.postCreateRequest.category == null) {
        alert("카테고리는 필수입니다.");
        return;
      }
      if(this.postCreateRequest.groupId == null) {
        alert("그룹ID가 지정되지 않았습니다.");
        return;
      }

      const response = await this.axios.post("http://localhost:8080/api/v1/posts", this.postCreateRequest);
      const postId = response.data.data;

      this.$router.push("/group/" + this.postCreateRequest.groupId + "/post/" + postId);
    }
  }
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
.post-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>