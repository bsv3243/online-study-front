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
        </div>
        <v-spacer></v-spacer>
        <LoginForm/>
      </v-container>
    </v-responsive>
  </v-app-bar>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
export default {
  name: "AppBar",
  components: {LoginForm},
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
  })
}
</script>

<style scoped>
</style>