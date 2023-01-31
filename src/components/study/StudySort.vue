<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <v-checkbox density="compact" hide-details="auto"
                      v-model="select" label="최신순" value="recent"></v-checkbox>
          <v-checkbox density="compact" v-model="select" label="인원순" value="members"></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "StudySort",
  data: () => ({
    select: []

  })
}
</script>

<style scoped>

</style>