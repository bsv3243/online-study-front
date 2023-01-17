<template>
  <v-sheet
      rounded="sm"
      min-height="70vh">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-select
              v-model="select"
              label="카테고리"
              :items="categories"
              item-title="title"
              item-value="value"
              density="comfortable"></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex">
      <v-card
        v-for="(group, i) in groups"
        :key="i"
        link>
        <v-card-item>
          <v-card-title v-text="group.title"></v-card-title>
          <v-card-subtitle v-text="group.category"></v-card-subtitle>
        </v-card-item>
        <v-card-text>
          {{group.memberCount}} / {{group.headcount}}
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "StudyList",
  data: () => ({
    groups: [
      {
        title: "테스트 그룹",
        category: "취직",
        headcount: 30,
        memberCount: 10,
      }
    ],
    categories: [
      {
        title: "전체",
        value: "ALL"
      },
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
    ],
    select: {title: "전체", value: "ALL"}
  })
}
</script>

<style scoped>

</style>