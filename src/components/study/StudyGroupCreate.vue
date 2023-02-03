<template>
  <v-dialog
      v-model="showDialog"
      max-width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">그룹 만들기</v-btn>
    </template>
    <v-card>
      <v-card-title>
        그룹 만들기
      </v-card-title>
      <v-card-text>
        <v-select
            :items="categories"
            item-title="title"
            item-value="value"
            variant="underlined"
            density="compact"
            label="카테고리">
        </v-select>
        <v-text-field
            variant="underlined"
            label="그룹 이름"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="showDialog=false">취소</v-btn>
        <v-btn>만들기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StudyGroupCreate",
  data:() => ({
    showDialog: false,
    select: {},
    categories: [
      {
        title: "취직",
        value: "JOB"
      },
      {
        title: "대학생",
        value: "UNIV",
      },
      {
        title: "독서",
        value: "BOOK"
      }
    ]
  })
}
</script>

<style scoped>

</style>