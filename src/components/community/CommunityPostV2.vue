<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet min-height="90vh">
      <v-responsive class="mx-auto" max-width="830px">
        <div class="d-flex flex-column">
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
          <div class="post-group-container">
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
                  인원: {{post.group.memberSize}}/{{post.group.headcount}}명
                </div>
              </div>
              <div class="d-flex flex-column">
                <div>
                  출석률: 97%
                </div>
                <div>
                  현재 {{getActiveGroupMembersSize(memberTickets)}} 명이 공부중입니다.
                </div>
              </div>
            </div>
            <div class="w-25">
              <v-btn class="float-end" color="amber-darken-1" variant="tonal">
                둘러보기
              </v-btn>
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
                  </div>
                  <div>
                    <span v-html="comment.content"></span>
                  </div>
                </v-list-item>
              </v-list>
            </div>
            <div class="d-flex">
              <textarea class="comment-form" rows="3"></textarea>
              <v-btn variant="outlined" class="comment-btn">
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
import {mdiEyeOutline} from "@mdi/js";
import moment from "moment";

export default {
  name: "CommunityPostV2",
  components: {
    SvgIcon
  },
  data:() => ({
    mdiEyeOutline,
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
    }]
  }),
  methods: {
    createdAtFrom(createdAt) {
      const date = new Date(createdAt);

      return moment(date).format("LLL")
    },
    getActiveGroupMembersSize(memberTickets) {
      const activeTickets = memberTickets.map(memberTicket => memberTicket.activeTicket);
      const filteredActiveTickets = activeTickets.filter(ticket => ticket !== null);

      console.log(filteredActiveTickets)

      return filteredActiveTickets.length/memberTickets.length;
    },
    getGroupStudyTimeAvg() {
      let studyTimeSum = 0;

      for(const studyRecord of this.studyRecords) {
        for(const record of studyRecord.records) {
          studyTimeSum += record.studyTime;
        }
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
</style>