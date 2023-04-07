<template>
  <v-sheet min-height="200" rounded="lg">
    <v-container class="profile-container">
      <div class="base-container">
        <div>
          닉네임
        </div>
        <input class="form" v-model="member.nickname"/>
        <v-btn @click="updateNickname" variant="tonal">
          변경
        </v-btn>
      </div>
      <div class="base-container">
        <div>
          비밀번호
        </div>
        <input v-model="password.passwordOld" placeholder="현재 비밀번호" class="form"/>
        <input v-model="password.passwordNew" placeholder="새로운 비밀번호" class="form"/>
        <input v-model="password.passwordNewCheck" placeholder="새로운 비밀번호 확인" class="form"/>
        <v-btn @click="updatePassword" variant="tonal">
          변경
        </v-btn>
      </div>
      <profile-group-list/>
      <profile-post-list/>
      <profile-comment-list/>
      <div class="base-container">
        <v-btn @click="deleteMember" variant="tonal">
          탈퇴
        </v-btn>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>

import ProfileGroupList from "@/components/profile/ProfileGroupList";
import ProfilePostList from "@/components/profile/ProfilePostList";
import {useLoginStore} from "@/store/LoginStore";
import ProfileCommentList from "@/components/profile/ProfileCommentList";

export default {
  name: "AppProfile",
  components: {
    ProfileCommentList,
    ProfilePostList,
    ProfileGroupList,
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore};
  },
  data:() => ({
    memberId: null,
    member: {
      nickname: "",
    },
    password: {
      passwordOld: "",
      passwordNew: "",
      passwordNewCheck: "",
    },
    dataReady: false,
  }),
  mounted() {
    if(!this.loginStore.isLogin) {
      this.$router.push("/")
    }
    this.init()
  },
  methods: {
    async init() {
      this.memberId = this.loginStore.getMemberId;
      this.member = await this.memberGetApiCall();

      console.log(this.member)

      this.dataReady = true;
    },
    updatePassword() {
      const request = {
        passwordOld: this.password.passwordOld,
        passwordNew: this.password.passwordNew,
        passwordNewCheck: this.password.passwordNewCheck
      }

      this.memberUpdateApiCall(request);

      this.password = {
        passwordOld: "",
        passwordNew: "",
        passwordNewCheck: "",
      }
    },
    updateNickname() {
      const request = {
        nickname: this.member.nickname
      }

      this.memberUpdateApiCall(request);
    },
    async memberGetApiCall() {
      try{
        const response = await this.axios.get("/api/v1/member/"+this.memberId);

        return response.data.data;
      }catch (err) {
        console.log(err);
      }
    },
    async memberUpdateApiCall(request) {
      try{
        const response = await this.axios.patch("/api/v1/member/"+this.memberId, request);

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteMember() {
      const request = {
        memberId: this.memberId
      }
      await this.deleteMemberApiCall(request)

      this.loginStore.logout
      this.$router.push("/")
    },
    async deleteMemberApiCall() {
      try {
        await this.axios.delete("/api/v1/member/"+this.memberId)
      } catch (err) {
        console.log(err);
      }
    }

  }
}
</script>

<style scoped>
.profile-container {
  max-width: 850px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}
.base-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #efefef;
  padding: 30px;
}
.form {
  height: 4vh;
  width: 100%;
  font-size: 16px;
  padding-left: 0.5rem;
  outline: 1px solid #e7e7e7;
}
.form:focus {
  outline: 2px solid #616161;
}

</style>