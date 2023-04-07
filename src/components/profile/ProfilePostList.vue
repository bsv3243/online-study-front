<template>
  <div class="base-container">
    <div class="title">
      <span>게시글 관리</span>
      <v-pagination v-model="page" :length="pageInfo.totalPages" total-visible="5"></v-pagination>
    </div>
    <div class="group-container" v-if="dataReady">
      <div class="card-container" v-for="post in posts" :key="post.postId">
      <div class="group-card">
        <span>{{ post.title }}</span>
        <div class="post-info">
          <div>
            <span>조회수</span>
            <span>{{ post.viewCount }}</span>
          </div>
          <div>
            <span>댓글</span>
            <span>{{ post.comments.length }}</span>
          </div>
        </div>
        <span>작성일 {{ getYMD(post.createdAt) }}</span>
        <div class="card-action">
          <v-btn @click="moveTo(post.postId)" variant="tonal">바로가기</v-btn>
          <v-btn variant="tonal">삭제</v-btn>
        </div>
      </div>
      </div>
    </div>
    <div class="align-self-end">
      <v-btn @click="deletePosts" variant="tonal">전체 삭제</v-btn>
    </div>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/LoginStore";
import moment from "moment";

export default {
  name: "ProfilePostList",
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data:() => ({
    memberId: null,
    page: 1,
    posts: [{
      postId: 1,
      title: "게시글제목",
      viewCount: 1,
      comments:[],
      createdAt: new Date().toISOString(),
    }],
    postsGetRequest: {
      page: 0,
      size: 4,
      memberId: null,
    },
    pageInfo: {
      number: 0,
      size: 4,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    },
    dataReady: false,
  }),
  watch: {
    page() {
      this.init();
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.memberId = this.loginStore.getMemberId;

      this.postsGetRequest.memberId = this.memberId
      this.postsGetRequest.page = this.page-1
      this.posts = await this.postsGetApiCall(this.postsGetRequest)

      this.dataReady = true
    },
    async postsGetApiCall(request) {
      try {
        const response = await this.axios.get("/api/v1/posts", {
          params: request
        });

        this.pageInfo = response.data;

        console.log(this.pageInfo)

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    getYMD(createdAt) {
      return moment(createdAt).format().substring(0, 10);
    },
    moveTo(postId) {
      this.$router.push("/community/"+postId)
    },
    async deletePosts() {
      const request = {
        memberId: this.memberId
      }
      await this.deletePostsApiCall(request);

      await this.init()
    },
    async deletePostsApiCall(request) {
      try {
        await this.axios.post("/api/v1/posts/delete", request)
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #efefef;
  padding: 30px;
}
.base-container .title {
  display: flex;
  justify-content: space-between;
}
.group-container {
  display: flex;
}
.card-container {
  padding: 5px;
  width: 25%;
}
.group-card {
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 10px;

  border: 2px solid #efefef;
  border-radius: 10px;
}
.group-card .card-action {
  display: flex;
  gap: 5px;
}
.post-info {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>