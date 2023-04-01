<template>
  <v-sheet min-height="90vh">
  <v-container>
    <v-row>
      <v-col cols="6">
        <div class="title-container" @click="moveToCategory('QUESTION')">
          <div class="title">
            질문 & 답변
          </div>
        </div>
        <div class="post-list-container" v-if="dataReady">
          <community-post-title :post="post"
                                v-for="post in questionPosts"
                                :key="post.postId"
                                @click="moveToPost(post.postId)"/>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="title-container" @click="moveToCategory('INFO')">
          <div class="title">
            정보
          </div>
        </div>
        <div class="post-list-container" v-if="dataReady">
          <community-post-title :post="post"
                                v-for="post in infoPosts"
                                :key="post.postId"
                                @click="moveToPost(post.postId)"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div class="title-container" @click="moveToCategory('CHAT')">
          <div class="title">
            잡담
          </div>
        </div>
        <div class="post-list-container" v-if="dataReady">
          <community-post-title :post="post"
                                v-for="post in chatPosts"
                                :key="post.postId"
                                @click="moveToPost(post.postId)"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </v-sheet>
</template>

<script>
import CommunityPostTitle from "@/components/community/CommunityPostTitle";
import {useCommunityStore} from "@/store/CommunityStore";
export default {
  name: "CommunityPostList",
  components: {
    CommunityPostTitle,

  },
  setup() {
    const communityStore = useCommunityStore();

    return {communityStore}
  },
  data:() => ({
    postCategories: [
      {
        value: "INFO",
        name: "정보"
      },
      {
        value: "QUESTION",
        name: "질문&답변"
      },
      {
        value: "CHAT",
        name: "잡담"
      }
    ],
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
    ]
  })
}
</script>

<style scoped>
.post-list-container {
  margin-bottom: 5vh;
}
.title {
  font-size: 20px;
  font-weight: 500;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 10px;
  border: 2px #999999 solid;
  border-radius: 10px;
}
.title-container:hover {
  cursor: pointer;
  color: #999999;
}
</style>