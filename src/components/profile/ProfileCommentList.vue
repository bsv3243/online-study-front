<template>
  <div class="base-container">
    <div class="title">
      <span>댓글 관리</span>
      <div>
        <v-pagination v-model="page" :length="pageInfo.totalPages" total-visible="5"></v-pagination>
      </div>
    </div>
    <div class="group-container" v-if="dataReady">
      <div class="card-container" v-for="comment in comments" :key="comment.commentId">
        <div class="group-card">
          <span>{{ comment.content }}</span>
          <span>가입일 {{ getYMD(comment.createdAt) }}</span>
          <div class="card-action">
            <v-btn @click="moveTo(comment.postId)" variant="tonal">바로가기</v-btn>
            <v-btn @click="deleteComment(comment.commentId)" variant="tonal">삭제</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="align-self-end">
      <v-btn @click="deleteComments" variant="tonal">전체 삭제</v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {useLoginStore} from "@/store/LoginStore";

export default {
  name: "ProfileCommentList",
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data:() => ({
    page: 1,
    memberId: null,
    comments:[
      {
        commentId: 1,
        content: "댓글 내용",
        createdAt: new Date().toISOString(),
        postId: 1
      }
    ],
    pageInfo: {
      number: 1,
      size: 8,
      totalPage: 1,
      hasNext: false,
      hasPrevious: false,
    },
    dataReady: false
  }),
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.memberId = this.loginStore.getMemberId;

      const request = {
        memberId: this.memberId,
        page: this.page-1,
        size: 8,
      }
      this.comments = await this.commentsGetApiCall(request)

      this.dataReady = true;
    },
    async commentsGetApiCall(request) {
      try{
        const response = await this.axios.get("/api/v1/comments", {
          params: request
        });

        this.pageInfo = response.data;

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
    async deleteComment(commentId) {
      await this.deleteCommentApiCall(commentId)

      await this.init()
    },
    async deleteCommentApiCall(commentId) {
      try {
        await this.axios.delete("/api/v1/comment/" + commentId);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteComments() {
      const request = {
        memberId: this.memberId
      }
      await this.deleteCommentsApiCall(request)

      await this.init()
    },
    async deleteCommentsApiCall(request) {
      try{
        await this.axios.post("/api/v1/comments/delete", request)
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
  flex-wrap: wrap;
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
</style>