<template>
  <v-sheet min-height="200" rounded="lg">
    <v-container class="profile-container">
      <div class="base-container">
        <div>
          닉네임
        </div>
        <input class="form"/>
        <v-btn variant="tonal">
          변경
        </v-btn>
      </div>
      <div class="base-container">
        <div>
          비밀번호
        </div>
        <input placeholder="현재 비밀번호" class="form"/>
        <input placeholder="새로운 비밀번호" class="form"/>
        <input placeholder="새로운 비밀번호 확인" class="form"/>
        <v-btn variant="tonal">
          변경
        </v-btn>
      </div>
      <profile-group-list/>
      <profile-post-list/>
      <div class="base-container">
        <v-btn variant="tonal">
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

export default {
  name: "AppProfile",
  components: {
    ProfilePostList,
    ProfileGroupList,
  },
  setup() {
    const loginStore = useLoginStore();

    return {loginStore};
  },
  data:() => ({
    memberId: null,
  }),
  mounted() {
  },
  methods: {
    async memberGetApiCall() {
      try{
        const response = await this.axios.get("/api/v1/member/"+this.memberId);

        return response.data.data;
      }catch (err) {
        console.log(err);
      }
    },

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