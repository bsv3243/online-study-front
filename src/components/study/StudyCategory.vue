<template>
  <v-sheet rounded="lg">
      <v-checkbox label="최신순" value="recent"></v-checkbox>
      <v-checkbox label="인원순" value="members"></v-checkbox>
  </v-sheet>
</template>

<script>
export default {
  name: "StudyCategory",
  data: () => ({
    categories: [
      {
        title: "취직",
        value: "JOB"
      },
      {
        title: "대학생",
        value: "UNIV"
      },
      {
        title: "어학",
        value: "LANG"
      }
    ],

  })
}
</script>

<style scoped>

</style>