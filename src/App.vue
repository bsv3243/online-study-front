<template>
  <v-app>
    <AppBar></AppBar>
    <v-main class="bg-grey-lighten-3">
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
