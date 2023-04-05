<template>
  <div>
    <h3>댓글</h3>
    <div>
      <v-list>
        <v-list-item class="comment" v-for="comment in comments" :key="comment.commentId">
          <div class="comment-info">
            <h4 v-html="comment.member.nickname"></h4>
            <span class="created-at" v-html="createdAtFrom(comment.createdAt)"></span>
          </div>
          <div>
            <span v-html="comment.content"></span>
          </div>
        </v-list-item>
      </v-list>
    </div>
    <div class="d-flex">
      <textarea class="comment-form" v-model="commentCreateRequest.content" rows="3"></textarea>
      <v-btn class="comment-btn" @click="createComment" variant="outlined">
        작성
      </v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CommunityPostComments",
  props: {
    postId: Number
  },
  data:() => ({
    comments: [

    ],
    commentCreateRequest: {
      content: "",
      postId: null,
    },
    commentsGetRequest: {
      postId: null,
      page: 0,
      size: 50,
    },
  }),
  methods: {
    createdAtFrom(createdAt) {
      const date = new Date(createdAt);

      return moment(date).format("LLL")
    },
    async createComment() {
      this.commentCreateRequest.postId = this.postId;

      await this.commentCreateApiCall()

      this.post.comments = await this.commentsGetApiCall()
    },
    async commentCreateApiCall() {
      try {
        const response = await this.axios.post("/api/v1/comments", this.commentCreateRequest)

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async commentsGetApiCall() {
      this.commentCreateRequest.postId = this.postId
      try {
        const response = await this.axios.get("/api/v1/comments", {
          params: this.commentsGetRequest
        });

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>

</style>