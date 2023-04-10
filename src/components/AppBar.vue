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
            <router-link to="/community" @click="initCommunityStore()" style="text-decoration: none; color: inherit">커뮤니티</router-link>
          </v-btn>
          <v-btn>
            <router-link to="/profile" style="text-decoration: none; color: inherit">계정관리</router-link>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <LoginForm v-if="!isLogin"/>
        <v-btn v-if="isLogin" @click="logoutApiCall" variant="plain">로그아웃</v-btn>
      </v-container>
    </v-responsive>
  </v-app-bar>
</template>

<script>
import {useLoginStore} from "@/store/LoginStore";
import LoginForm from "@/components/login/LoginForm";
import {useCommunityStore} from "@/store/CommunityStore";
import {watch} from "vue";
export default {
  name: "AppBar",
  components: {LoginForm},
  setup() {
    const loginStore = useLoginStore();
    const communityStore = useCommunityStore();

    return {loginStore, communityStore};
  },
  data: () => ({
    isLogin: false,
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
  watch: {
  },
  async mounted() {
    this.isLogin = this.loginStore.isLogin
    watch(() => this.loginStore.isLogin, () => {
      this.isLogin = this.loginStore.isLogin
    })
  },
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
    initCommunityStore() {
      this.communityStore.initStore()
    }
  }
}
</script>

<style scoped>
</style>