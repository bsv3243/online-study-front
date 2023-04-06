<template>
  <v-responsive class="mx-auto" max-width="1200">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830">
        <div class="write-container">
          <div class="select-container">
            <v-select
                label="카테고리"
                :items="categories"
                v-model="postUpdateRequest.category"
                item-title="name"
                item-value="value" density="comfortable" variant="outlined">
            </v-select>
          </div>
          <div class="title-container">
            <input class="title-form" placeholder="제목을 입력해주세요." v-model="this.postUpdateRequest.title"/>
          </div>
          <tiptap :parent-content="post.content" @content="contentUpdate"/>
          <div class="post-tags">
            <span class="align-self-center text-grey-darken-1" v-if="selectedStudies.length===0">원하시는 태그를 지정해주세요.</span>
            <v-chip v-for="tag in selectedStudies" :key="tag.studyId">
              # {{tag.name}}
            </v-chip>
          </div>
          <div class="post-bottom">
            <div>
              <v-dialog
                  v-model="showTagsDialog"
                  max-width="350">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" variant="outlined">태그 선택</v-btn>
                </template>
                <add-study-form @studies="setSelectedStudies"
                                @show-dialog="closeTagsDialog"
                                :post-studies="selectedStudies"
                                :form-title="'태그 선택'"/>
              </v-dialog>
            </div>
            <div class="button-post-write">
              <v-btn @click="showPost" variant="outlined">
                취소
              </v-btn>
              <v-btn variant="outlined" class="bg-green-lighten-1" @click="postUpdateApiCall">
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
import AddStudyForm from "@/components/community/AddStudyForm";

export default {
  name: "UpdatePost",
  components: {AddStudyForm, Tiptap},
  props: {
    post: Object
  },
  setup() {
  },
  data:() => ({
    showTagsDialog: false,
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
    selectedStudies: [],
    content: null,

    //axios
    //api call complete
    dataReady: false,

    //request
    postUpdateRequest: {
      title: null,
      content: null,
      category: null,
      studyIds: null,
    },
    studiesGetRequest: {
      page: 0,
      size: 10,
      name: "",
      memberId: null,
      groupId: null,
    }
  }),
  watch: {
    content() {
      this.postUpdateRequest.content = this.content
    },
    selectedStudies() {
      console.log(this.selectedStudies)
    }
  },
  async mounted() {
    console.log(this.post)

    this.selectedStudies = this.post.postStudies
    this.postUpdateRequest.title = this.post.title
    this.postUpdateRequest.content = this.post.content
    this.postUpdateRequest.category = this.post.category
    console.log(this.post.category)

    console.log(this.postUpdateRequest)
    
    this.studies = await this.studiesGetApiCall()
  },
  methods: {
    showPost() {
      this.$emit("showUpdatePost", false);
    },
    contentUpdate(content) {
      this.content = content;
    },
    setSelectedStudies(value) {
      this.selectedStudies = value
    },
    getSelectedStudyIds() {
      return this.selectedStudies.map(study => study.studyId);
    },
    closeTagsDialog(value) {
      this.showTagsDialog = value
    },
    async postUpdateApiCall() {
      if(this.postUpdateRequest.title.length < 1) {
        alert("제목은 공란일 수 없습니다.")
        return;
      }
      if(this.postUpdateRequest.content.length < 1) {
        alert("본문은 공란일 수 없습니다.");
        return;
      }
      if(this.postUpdateRequest.category == null) {
        alert("카테고리는 필수입니다.");
        return;
      }

      this.postUpdateRequest.studyIds = this.getSelectedStudyIds()

      console.log(this.postUpdateRequest)

      try {
        const response = await this.axios.patch("/api/v1/post/"+this.post.postId, this.postUpdateRequest);

        const postId = response.data.data;

        this.$router.go();
      } catch (err) {
        console.log(err)
      }


    },
    async studiesGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/studies", {
          params: this.studiesGetRequest
        });

        return response.data.data;
      }catch (err) {
        console.log(err);
      }
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
.post-tags {
  display: flex;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-top: 5px;
  gap: 5px
}
.post-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
</style>