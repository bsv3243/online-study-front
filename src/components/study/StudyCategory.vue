<template>
  <v-sheet rounded="lg">
    <v-radio-group>
      <v-card-title class="ma-2">
        <h4>분류별</h4>
      </v-card-title>
      <v-radio label="전체" value="ALL"></v-radio>
      <v-radio label="취직" value="JOB"></v-radio>
      <v-radio label="대학생" value="UNIV"></v-radio>
      <v-radio label="어학" value="LANG"></v-radio>
    </v-radio-group>
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