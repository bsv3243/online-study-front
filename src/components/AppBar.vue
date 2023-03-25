<template>
  <v-app-bar elevation="1">
    <v-responsive class="mx-auto" max-width="1200px">
      <v-container class="d-flex">
        <div>
          <v-app-bar-title class="mt-1">타이틀</v-app-bar-title>
        </div>
        <div class="ml-4">
          <v-btn>
            <router-link to="/" style="text-decoration: none; color: inherit">공부방</router-link>
          </v-btn>
          <v-btn>
            <router-link to="/record" style="text-decoration: none; color: inherit">공부기록</router-link>
          </v-btn>
          <v-btn>
            <router-link to="/community" style="text-decoration: none; color: inherit">커뮤니티</router-link>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <LoginForm v-if="!loginStore.isLogin"/>
        <v-btn v-if="loginStore.isLogin" @click="logoutApiCall" variant="plain">로그아웃</v-btn>
      </v-container>
    </v-responsive>
  </v-app-bar>
</template>

<script>
import {useLoginStore} from "@/LoginStore";
import {useMemberStore} from "@/store/MemberStore";
import LoginForm from "@/components/login/LoginForm";
export default {
  name: "AppBar",
  components: {LoginForm},
  setup() {
    const loginStore = useLoginStore();
    const memberStore = useMemberStore();

    return {loginStore, memberStore};
  },
  async mounted() {
    if(this.loginStore.isLogin) {
      await this.memberGetApiCall()
    }
  },
  data: () => ({
    links: [
      {
        title:"공부방"
      },
      {
        title:"기록"
      },
      {
        title:"프로필"
      }
    ],
    loginDialog: false,
  }),
  methods: {
    async logoutApiCall() {
      try {
        await this.axios.post("/api/v1/logout")

        this.loginStore.logout()
        this.$router.push("/")
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
      }
    },
    async memberGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/member");
        this.memberStore.setMember(response.data.data);
      } catch (err) {
        this.loginStore.logout();
        alert("세션 정보가 만료되었습니다.")
      }
    }
  }
}
</script>

<style scoped>
</style>