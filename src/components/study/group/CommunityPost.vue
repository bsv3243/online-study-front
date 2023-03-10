<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830px">
      <div class="d-flex flex-column">
        <div class="pt-5">
          <v-btn variant="outlined" @click="moveToPostList">
            목록
          </v-btn>
        </div>
        <div class="border-b pb-5">
          <p class="title">{{ post.title }}</p>
          <p class="writer">{{post.member.nickname}}</p>
          <div class="d-flex">
            <p class="date">작성일 {{ createdAtYMD }} {{createdAtHMS}}</p>
            <div class="d-flex pl-2">
              <SvgIcon type="mdi" :path="mdiEyeOutline"/>
              <p>300</p>
            </div>
          </div>
        </div>
        <div class="py-5">
          <span v-html="post.content"/>
        </div>
        <div>
          <v-chip-group>
            <v-chip v-for="tag in post.postStudies" :key="tag.studyId" class="pa-2" label>
              # {{tag.name}}
            </v-chip>
          </v-chip-group>
        </div>
        <div>
          <h3>댓글</h3>
          <div>
            <v-list>
              <v-list-item class="comment" v-for="comment in post.comments" :key="comment.commentId">
                <div class="comment-info">
                  <h4 v-html="comment.member.nickname"></h4>
                  <span class="created-at" v-html="getCreatedAtToString(comment.createdAt)"></span>
                </div>
                <div>
                  <span v-html="comment.content"></span>
                </div>
              </v-list-item>
            </v-list>
          </div>
          <div class="d-flex">
            <textarea class="comment-form" rows="3" v-model="commentCreateRequest.content"></textarea>
            <v-btn variant="outlined" class="comment-btn" @click="commentCreateApiCall">
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
    ],
    createdAtYMD: null,
    createdAtHMS: null,

    //route
    groupId: null,

    //axios
    //api call complete
    dataReady: false,
    //post get request
    postId: null,
    //comment create request {
    commentCreateRequest: {
      content: null,
      postId: null,
    },
    //data
    post: {
      postId: 0,
      title: "제목",
      content: "내용",
      category: "CHAT",
      createdAt: "2023-03-07T20:07:04",
      viewCount: 0,
      member: {
        memberId: 1,
        username: "이름",
        nickname: "닉네임"
      },
      group: {
        groupId: 1,
        name: "그룹 이름"
      },
      postStudies: [
        {
          postStudyId: 1,
          studyId: 1,
          name: "스터디"
        }
      ],
      comments: [
        {
          commentId: 1,
          content: "댓글 내용",
          member: Object,
          postId: 1
        }
      ]
    }
  }),
  mounted() {
    this.postId = this.$route.params.postId;
    this.groupId = this.$route.params.groupId

    this.postGetApiCall()
  },
  methods: {
    async postGetApiCall() {
      const response = await this.axios.get("http://localhost:8080/api/v1/post/"+this.postId);
      this.post = response.data.data;


      this.createdAtYMD = this.post.createdAt.substring(0, 10);
      this.createdAtHMS = this.post.createdAt.substring(11, 19);
      this.dataReady = true;
    },
    async commentCreateApiCall() {
      if(this.commentCreateRequest.content.length < 1) {
        alert("댓글 내용이 없습니다.");
        return;
      }
      this.commentCreateRequest.postId = this.postId

      await this.axios.post("http://localhost:8080/api/v1/comments", this.commentCreateRequest);
      this.$router.go(this.$router.currentRoute)
    },
    getCreatedAtToString(createdAt) {
      const commentCreatedAt = new Date(createdAt);
      const now = new Date();

      let str;

      const seconds = now.getTime()/1000 - commentCreatedAt.getTime()/1000;
      if(seconds < 60) {
        str = Math.floor(seconds) + "초 전"
      } else if(seconds < 60*60) {
        str = Math.floor(seconds/60) + "분 전"
      } else if(seconds < 60*60*24) {
        str = Math.floor(seconds/360) + "시간 전"
      } else {
        str = Math.floor(seconds/360*24) + "일 전"
      }

      return str;
    },
    moveToPostList() {
      this.$router.push("/group/"+this.groupId)
    }
  }
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
.created-at {
  color: #999999;
}
.comment {
}
.comment-info {
  display: flex;
  align-content: center;
  gap: 10px;
  font-size: 15px;
}
</style>