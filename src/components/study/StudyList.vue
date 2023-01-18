<template>
  <v-sheet
      rounded="sm"
      min-height="90vh">
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
        <v-col cols="5">
          <v-form>
            <v-text-field
                label="검색"
                v-model="search"
                density="comfortable">
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex flex-wrap">
      <v-card
          class="ma-1 mx-2"
        v-for="(group, i) in groups"
        :key="i"
        link>
        <router-link to="/group" style="text-decoration: none; color: inherit;">
        <v-card-item>
          <v-card-title v-text="group.title"></v-card-title>
          <v-card-subtitle v-text="group.category"></v-card-subtitle>
        </v-card-item>
        </router-link>
        <v-card-text>
          {{group.memberCount}} / {{group.headcount}}
        </v-card-text>
      </v-card>
    </v-container>
    <v-container>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="5">
        </v-pagination>
      </div>
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
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5
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
    select: {title: "전체", value: "ALL"},
    page: 1,
    search: "",
  }),
  methods: {
    clickGroup() {

    }
  }
}
</script>

<style scoped>
</style>