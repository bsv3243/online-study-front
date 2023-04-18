<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830px">
        <div class="d-flex flex-column" v-if="!showUpdatePost">
          <div class="pt-5">
            <v-btn variant="outlined">
              목록
            </v-btn>
          </div>
          <div class="border-b pb-5">
            <p class="title">{{ post.title }}</p>
            <p class="writer">{{post.member.nickname}}</p>
            <div class="d-flex">
              <p class="date">작성일 {{createdAtFrom(post.createdAt)}}</p>
              <div class="d-flex pl-2">
                <SvgIcon type="mdi" :path="mdiEyeOutline"/>
                <p>{{ post.viewCount }}</p>
              </div>
              <div class="update-text-buttons" v-if="isMemberOwn(post.member.memberId)">
                <p @click="moveToUpdatePost(true)">수정</p>
                <p>·</p>
                <p @click="deletePost">삭제</p>
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
          <div class="post-group-container"  v-if="!post.group.deleted">
            <div class="w-25">
              <div>
                {{post.group.name}}
              </div>
            </div>
            <div class="d-flex justify-space-evenly w-100">
              <div class="d-flex flex-column">
                <div>
                  그룹 카테고리: {{post.group.category}}
                </div>
                <div>
                  인원: {{memberTickets.length}}/{{post.group.headcount}}명
                </div>
              </div>
              <div class="d-flex flex-column">
                <div>
                  출석률: {{getAttendance()}}%
                </div>
                <div>
                  현재 {{getActiveGroupMembersSize(memberTickets)}} 명이 공부중입니다.
                </div>
              </div>
            </div>
            <div class="w-25">
              <v-btn class="float-end" @click="moveToGroup(post.group.groupId)" color="amber-darken-1" variant="tonal">
                둘러보기
              </v-btn>
            </div>
          </div>
          <div class="post-group-container" v-if="post.group.deleted">
            <div class="d-flex justify-center w-100">
              <span>삭제된 그룹입니다.</span>
            </div>
          </div>
          <div>
            <h3>댓글</h3>
            <div>
              <v-list>
                <v-list-item class="comment" v-for="comment in post.comments" :key="comment.commentId">
                  <div class="comment-info">
                    <h4 v-html="comment.member.nickname"></h4>
                    <span class="created-at" v-html="createdAtFrom(comment.createdAt)"></span>
                    <div class="update-text-buttons" v-if="isMemberOwn(post.member.memberId)">
                      <p @click="showUpdateComment = true">수정</p>
                      <p>·</p>
                      <p @click="deleteComment(comment.commentId)">삭제</p>
                    </div>
                  </div>
                  <div>
                    <span v-html="comment.content" v-if="!showUpdateComment"></span>
                    <div class="d-flex" v-if="showUpdateComment">
                      <textarea class="comment-form" v-model="comment.content" rows="3"></textarea>
                      <v-btn class="comment-btn" @click="updateComment(comment)" variant="outlined">
                        작성
                      </v-btn>
                    </div>
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
        </div>
        <update-post :post="post" @show-update-post="moveToUpdatePost" v-if="showUpdatePost"/>
      </v-responsive>
    </v-sheet>
  </v-responsive>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiEyeOutline} from "@mdi/js";
import moment from "moment";
import UpdatePost from "@/components/community/UpdatePost";
import {useLoginStore} from "@/store/LoginStore";

export default {
  name: "CommunityPostV2",
  components: {
    UpdatePost,
    SvgIcon
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data: () => ({
    mdiEyeOutline,
    showUpdatePost: false,
    showUpdateComment: false,
    postId: null,
    post: {
      postId: 0,
      title: "제목",
      content: "내용",
      category: "IT",
      createdAt: "2023-03-07T20:07:04",
      viewCount: 0,
      member: {
        memberId: 1,
        username: "이름",
        nickname: "닉네임"
      },
      group: {
        groupId: 1,
        name: "그룹 이름",
        category: "IT",
        headcount: 30,
        memberSize: 20
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
          member: {
            memberId: 1,
            username: "댓글 회원 이름",
            nickname: "댓글 회원 닉네임"
          },
          createdAt: "2023-03-26T19:23:12",
          postId: 1
        }
      ]
    },
    memberTickets: [
      {
        memberId: 1,
        nickname: "닉네임",
        activeTicket: {
          ticketId: 1,
          status: "STUDY",
          activeTime: 0,
          startTime: new Date(),
          endTime: new Date(),
          expired: false,
          study: Object
        },
        expiredTickets: Array,
        studyTime: 0
      }
    ],
    studyRecords: [{
      studyId: 1,
      studyName: "스터디",
      memberCount: 1,
      records: [{
        date: "2023-03-26",
        startTime: "2023-03-26T22:24:25.0785363",
        endTime: "2023-03-27T00:24:25.0785363",
        studyTime: 0,
        memberCount: 1
      }]
    }],

    commentCreateRequest: {
      content: "",
      postId: null,
    },
    commentsGetRequest: {
      postId: null,
      page: 0,
      size: 50,
    },
    commentUpdateRequest: {
      content: "",
    },

    dataReady: false,
  }),
  watch: {
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.postId = this.$route.params.postId;
      this.post = await this.postGetApiCall()

      if(this.post.deleted) {
        this.memberTickets = await this.ticketsGetApiCall()
      }

      console.log(this.post)

      this.dataReady = true;
    },
    createdAtFrom(createdAt) {
      const date = new Date(createdAt);

      return moment(date).format("LLL")
    },
    getActiveGroupMembersSize(memberTickets) {
      const activeTickets = memberTickets.map(memberTicket => memberTicket.activeTicket);
      const filteredActiveTickets = activeTickets.filter(ticket => ticket !== null);

      return filteredActiveTickets.length / memberTickets.length;
    },
    getAttendance() {
      let attendedMember = 0;
      for (const memberTicket of this.memberTickets) {
        if (memberTicket.activeTicket || memberTicket.expiredTickets.length > 0) {
          attendedMember++;
        }
      }

      return Math.floor(attendedMember / this.memberTickets.length * 100)
    },
    moveToGroup(groupId) {
      this.$router.push("/group/" + groupId)
    },
    moveToUpdatePost(value) {
      this.showUpdatePost=value;
    },
    isMemberOwn(memberId){
      const loginMemberId = this.loginStore.getMemberId

      return memberId === loginMemberId
    },
    async deleteComment(commentId) {
      await this.commentDeleteApiCall(commentId);

      this.post.comments = await this.commentsGetApiCall()
    },
    async deletePost() {
      await this.postDeleteApiCall();

      this.$router.go(-1);
    },
    async createComment() {
      this.commentCreateRequest.postId = this.postId;

      await this.commentCreateApiCall()

      this.post.comments = await this.commentsGetApiCall()
    },
    async updateComment(comment) {
      this.commentUpdateRequest.content = comment.content;

      console.log(this.commentUpdateRequest.content)

      await this.commentUpdateApiCall(comment.commentId)

      this.post.contents = await this.commentsGetApiCall()
      this.showUpdateComment = false
    },
    async postGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/posts/" + this.postId);

        return response.data.data;
      } catch (err) {
        console.log(err);
        alert("게시글이 존재하지 않습니다.")
        this.$router.go(-1);
      }
    },
    async postDeleteApiCall() {
      try {
        await this.axios.delete("/api/v1/posts/"+this.postId);
      }catch (err) {
        console.log(err);
      }
    },
    async ticketsGetApiCall() {
      const ticketsGetRequest = {
        groupId: this.post.group.groupId,
        date: moment(new Date()).format().substring(0, 10),
        days: 1
      }

      try {
        const response = await this.axios.get("/api/v1/tickets", {
          params: ticketsGetRequest
        })

        return response.data.data;
      } catch (err) {
        console.log(err)
      }
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
    },
    async commentUpdateApiCall(commentId) {
      try{
        console.log(this.commentUpdateRequest)
        await this.axios.patch("/api/v1/comments/"+commentId, this.commentUpdateRequest)

        console.log(this.commentUpdateRequest)
      }catch (err) {
        console.log(err)
      }
    },
    async commentDeleteApiCall(commentId) {
      try {
        const response = await this.axios.delete("/api/v1/comments/"+commentId);

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
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
.post-group-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px #e9ebee solid;
  border-radius: 10px;
  padding: 10px;
}
.update-text-buttons {
  display: flex;
  color: #999999;
  padding-left: 5px;
}
.update-text-buttons p {
  cursor: pointer;
}
</style>