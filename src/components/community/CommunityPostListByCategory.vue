<template>
  <v-sheet min-height="90vh">
    <v-container>
      <div class="container">
        <div class="search-container">
          <div class="div-form">
            <input v-model="postsGetRequest.search" placeholder="알고싶은 내용에 대해 검색해보세요."/>
          </div>
          <v-btn @click="searchWithStudies" variant="tonal" color="amber-darken-1" height="5vh" width="5vw">검색</v-btn>
        </div>
        <div class="search-container">
          <v-dialog
              v-model="showTagsDialog"
              max-width="350">
            <template v-slot:activator="{ props }">
              <div class="div-form" v-bind="props">
                <div class="chip-container align-center" v-if="studies.length>0">
                  <v-chip v-for="tag in studies" :key="tag.name" style="z-index: 1" label># {{tag.name}}</v-chip>
                </div>
              <span class="tags-hint" v-if="studies.length===0">검색하고 싶은 태그를 추가해보세요.</span>
              </div>
            </template>
            <add-study-form @studies="setSelectedStudies"
                            @show-dialog="closeTagsDialog"
                            :post-studies="studies"
                            :form-title="'태그 선택'"/>
          </v-dialog>
          <v-btn @click="searchWithStudies" variant="tonal" color="amber-darken-1" height="5vh" width="5vw">태그 검색</v-btn>
        </div>

        <v-divider/>

        <div class="d-flex flex-column">
          <div v-if="dataReady">
          <community-post-title-with-content :post="post" v-for="post in posts" :key="post.postId" @click="moveToPost(post)"/>
          </div>
          <v-pagination/>
        </div>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import CommunityPostTitleWithContent from "@/components/community/CommunityPostTitleWithContent";
import {watch} from "vue";
import {useCommunityStore} from "@/store/CommunityStore";
import AddStudyForm from "@/components/community/AddStudyForm";
export default {
  name: "CommunityPostListByCategory",
  components: {CommunityPostTitleWithContent, AddStudyForm},
  setup() {
    const communityStore = useCommunityStore();

    return {communityStore}
  },
  data:() => ({
    category: null,
    tagKeyword: null,
    studies: [],
    showTagsDialog: false,

    postsGetRequest: {
      category: null,
      search: "",
      studyIds: [],
      page: 0,
      size: 10
    },
    posts: [
      {
        postId: 1,
        title: "제목",
        content: "내용",
        createdAt: new Date().toISOString(),
        member: {
          nickname: "회원A"
        },
        postStudies: [
          {
            postStudyId: 1,
            studyId: 1,
            name: "내용"
          }
        ],
        comments:[
          {
            commentId: 1,
            content: "내용"
          }
        ]
      }
    ],
    dataReady: false
  }),
  watch: {
    category() {
      this.init();
    }
  },
  async mounted() {
    watch(() => this.communityStore.category, () => {
      this.category = this.communityStore.getCategory
    })

    this.category = this.communityStore.getCategory

    await this.init()
  },
  methods: {
    async init() {
      this.posts = await this.postsGetApiCall();

      this.dataReady = true;
    },
    makeTag() {
      const tag = {
        name: this.tagKeyword
      }

      this.tagKeyword = null
      this.tags.push(tag);
    },
    setSelectedStudies(value) {
      this.studies = value;
    },
    closeTagsDialog(value) {
      this.showTagsDialog=value;
    },
    moveToPost(post) {
      this.$router.push("community/"+post.postId);
    },
    async searchWithStudies() {
      const studyIds = this.studies.map(study => study.studyId);
      this.postsGetRequest.studyIds = studyIds.join(",");

      console.log(this.postsGetRequest)

      this.posts = await this.postsGetApiCall()

      console.log(this.posts)
    },
    async postsGetApiCall() {
      this.postsGetRequest.category = this.category.value;
      try {
        const response = await this.axios.get("/api/v1/posts", {
          params: this.postsGetRequest
        });

        return response.data.data;
      }catch (err) {
        console.log("잠시 후에 다시 시도해주세요.")
      }

    }
  }

}
</script>

<style scoped>
.div-form {
  display: flex;
  width: 50%;
  outline: 1px solid #dee2e6;
  border-radius: 10px;
}
.div-form:focus-within {
  outline: 2px solid #616161;
}
.div-form input {
  height: 5vh;
  width: 100%;
  font-size: 14px;
  padding-left: 0.5rem;
}
.div-form input:focus {
  outline: none;
}
.div-form button:hover {
  background-color: inherit;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.search-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.chip-container {
  display: flex;
  align-items: center;
  gap: 3px;
  padding-left: 5px;
}
.tags-hint {
  align-self: center;
  padding-left: 7px;
  font-size: 14px;
  color: #999999;
}
</style>