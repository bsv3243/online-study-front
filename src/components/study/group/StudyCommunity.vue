<template>
  <v-container>
    <v-list>
      <h2 class="text-center mb-5" v-if="posts === undefined">게시글이 없습니다.</h2>
      <v-divider/>
      <div v-if="dataReady">
        <v-list-item v-for="post in posts" :key="post.id" link @click="moveToPost(post.postId)">
          <div class="d-flex flex-column py-2">
            <div class="title">{{post.title}}</div>
            <span class="content" v-html="post.content"></span>
            <div class="content">
              <div class="post-info">
                <div>{{post.member.nickname}}</div>
                <span v-html="getCreatedAtToString(post.createdAt)"/>
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <v-chip-group>
                <v-chip v-for="tag in post.postStudies" :key="tag.id" class="pa-2" label>
                  # {{tag.title}}
                </v-chip>
              </v-chip-group>
              <div class="d-flex align-center">
                <svg-icon type="mdi" :path="mdiEyeOutline"/>1
                <div class="px-1"/>
                <svg-icon type="mdi" :path="mdiCommentOutline"/>{{post.comments.length}}
              </div>
            </div>
          </div>
        </v-list-item>
      </div>
      <v-divider/>
    </v-list>
    <div class="community-bottom">
      <v-spacer/>
      <v-pagination v-model="page"
                    :length="totalPages"
                    total-visible="7"></v-pagination>
      <div class="pt-2">
        <v-btn class="float-right bg-green-lighten-1" variant="outlined" @click="moveToPostWrite">
          글쓰기
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCommentOutline, mdiEyeOutline } from '@mdi/js';
export default {
  name: "StudyCommunity",
  components: {
    SvgIcon
  },
  props: {
    group: Object
  },
  data: () => ({
    mdiCommentOutline,
    mdiEyeOutline,
    page: 1,
    totalPages: 1,


    //axios
    //api call complete
    dataReady: false,
    //request object
    postsGetRequest: {
      page: 0,
      size: 10,
      groupId: null,
      search: null,
      category: null,
      studyIds: null
    },
    //response
    response: null,
    posts: [
      {
        postId: 1,
        title: "게시글 제목",
        content: "게시글 내용",
        category: "CHAT",
        member: "작성자",
        group: "그룹",
        postStudies: [
          {
            postStudyId: 1,
            studyId: 1,
            name: "spring"
          }
        ],
        comments: [
          {
            commentId: 0,
            content: "댓글내용",
            member: "tester",
            postId: 1
          }
        ]
      }
    ],
  }),
  mounted() {
    this.postsGetApiCall()

  },
  methods: {
    async postsGetApiCall() {
      this.postsGetRequest.page = this.page-1
      const response = await this.axios.get("http://localhost:8080/api/v1/posts", {
        params: {
          page: this.postsGetRequest.page,
          size: this.postsGetRequest.size,
          groupId: this.postsGetRequest.groupId,
          search: this.postsGetRequest.search,
          category: this.postsGetRequest.category,
          studyIds: this.postsGetRequest.studyIds,
        }
      });
      this.posts = response.data.data;
      this.response = response.data;


      this.totalPages = this.response.totalPages+1

      this.dataReady = true;
    },
    moveToPostWrite() {
      this.$router.push("/group/"+ this.group.groupId +"/post/new");
    },
    moveToPost(postId) {
      this.$router.push("/group/"+this.group.groupId + "/post/" + postId)
    },
    getCreatedAtToString(createdAt) {
      const created = new Date(createdAt);
      const now = new Date();

      let str;

      const seconds = now.getTime()/1000 - created.getTime()/1000;
      if(seconds < 60) {
        str = Math.floor(seconds) + "초 전"
      } else if(seconds < 3600 && seconds >=60) {
        str = Math.floor(seconds/60) + "분 전"
      } else if(seconds < (3600*24) && seconds >= 3600) {
        str = Math.floor(seconds/3600) + "시간 전"
      } else {
        str = Math.floor(seconds/(3600*24)) + "일 전"
      }

      return str;
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap');

  .title {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 20px;
  }
  .content {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  .community-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .post-info {
    display: flex;
    gap: 5px;
    color: #999999;
    font-size: 15px;
  }
</style>