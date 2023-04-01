<template>
  <v-sheet min-height="90vh">
    <v-container>
      <div class="container">
        <div class="search-container">
          <div class="div-form">
            <input placeholder="알고싶은 내용에 대해 검색해보세요."/>
          </div>
          <v-btn variant="tonal" color="amber-darken-1" height="5vh" width="5vw">검색</v-btn>
        </div>
        <div class="search-container">
          <div class="div-form">
            <div class="chip-container align-center" v-if="tags.length>0">
              <v-chip v-for="tag in tags" :key="tag.name" label closable>{{tag.name}}</v-chip>
            </div>
            <input placeholder="태그로 검색해보세요." v-model="tagKeyword" @keyup.enter="makeTag"/>
          </div>
        </div>

        <v-divider/>

        <div class="d-flex flex-column">
          <div v-if="dataReady">
          <community-post-title :post="post" v-for="post in posts" :key="post.postId" @click="moveToPost(post)"/>
          </div>
          <v-pagination/>
        </div>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import CommunityPostTitle from "@/components/community/CommunityPostTitle";
import {watch} from "vue";
import {useCommunityStore} from "@/store/CommunityStore";
export default {
  name: "CommunityPostListByCategory",
  components: {CommunityPostTitle},
  setup() {
    const communityStore = useCommunityStore();

    return {communityStore}
  },
  data:() => ({
    category: null,
    tagKeyword: null,
    tags: [],

    postsGetRequest: {
      category: null,
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
    moveToPost(post) {
      this.$router.push("community/"+post.postId);
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
</style>