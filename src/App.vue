<template>
  <v-app>
    <AppBar></AppBar>
    <v-main class="bg-grey-lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
export default {
  name: 'App',

  components: {
    AppBar
  },

  data: () => ({
    //
  }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&display=swap');

body {
  font-family: "Noto Sans KR", serif;
  font-weight: 400;
}
</style>