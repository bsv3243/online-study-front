<template>
  <v-app-bar>
    <v-responsive class="mx-auto" max-width="1200px">
      <v-container class="d-flex">
        <div>
          <v-app-bar-title class="mt-1">타이틀</v-app-bar-title>
        </div>
        <div class="ml-4">
          <v-btn>
            <router-link to="/">공부방</router-link>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn>로그인</v-btn>
      </v-container>
    </v-responsive>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
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
    ]
  })
}
</script>

<style scoped>

</style>