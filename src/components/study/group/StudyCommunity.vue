<template>
  <v-container>
    <v-list>
      <v-divider/>
        <v-list-item v-for="post in posts" :key="post.id" link>
          <div class="d-flex flex-column py-2">
            <div class="title">{{post.title}}</div>
            <div class="content">{{post.content}}</div>
            <div class="content">
              <div>{{post.member}}</div>
              <div class="d-flex align-center">
                <svg-icon type="mdi" :path="mdiEyeOutline"/>1
                <div class="px-1"/>
                <svg-icon type="mdi" :path="mdiCommentOutline"/>1
              </div>
            </div>
          </div>
        </v-list-item>
      <v-divider/>
    </v-list>
    <v-pagination class="text-center" length="5"></v-pagination>
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
  data: () => ({
    mdiCommentOutline,
    mdiEyeOutline,
    posts: [
      {
        id: 1,
        title: "게시글 제목",
        content: "게시글 내용",
        member: "작성자"
     }
    ]
  })
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
</style>