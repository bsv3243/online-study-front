<template>
  <div class="container">
  <v-list-item link>
    <div class="d-flex flex-column py-2">
      <div class="content">
        <div class="post-info">
          <div class="texts">
            <div>{{post.member.nickname}}</div>
            <div>·</div>
            <span v-html="createdAt"/>
          </div>
          <div class="icons">
            <div class="d-flex">
            <svg-icon type="mdi" :path="mdiEyeOutline"/>1
            </div>
            <div class="d-flex">
            <svg-icon type="mdi" :path="mdiCommentOutline"/>{{post.comments.length}}
            </div>
          </div>
        </div>
      </div>
      <div class="title">{{post.title}}</div>
      <div class="d-flex justify-space-between">
        <v-chip-group>
          <v-chip v-for="study in post.postStudies" :key="study.studyId" class="pa-2" size="small" label>
            # {{study.name}}
          </v-chip>
        </v-chip-group>
      </div>
    </div>
  </v-list-item>
  </div>
</template>

<script>
import moment from "moment";
import 'moment/locale/ko';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCommentOutline, mdiEyeOutline } from '@mdi/js';

export default {
  name: "CommunityPostTitle",
  components: {
    SvgIcon,

  },
  props: {
    post: Object
  },
  data:() => ({
    mdiEyeOutline,
    mdiCommentOutline,
    createdAt: null,
  }),
  mounted() {
    this.getPostCreatedAt()
  },
  methods: {
    getPostCreatedAt() {
      const createdAtString = this.post.createdAt;
      const createdAt = new Date(createdAtString);

      this.createdAt = moment(createdAt).fromNow()
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 17px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #999999;
  font-size: 15px;
}
.post-info .texts {
  display: flex;
}
.post-info .icons {
  display: flex;
  gap: 5px;
}
.container {
  border-bottom: 1px #d2d4d9 solid;
}
</style>