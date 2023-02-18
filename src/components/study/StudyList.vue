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
              variant="outlined"
              density="comfortable"></v-select>
        </v-col>
        <v-col cols="5">
          <v-form>
            <v-text-field
                label="검색"
                v-model="search"
                variant="outlined"
                density="comfortable">
            </v-text-field>
          </v-form>
        </v-col>
        <v-spacer/>
        <v-col>
          <StudyGroupCreate/>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="study-list">
      <div class="pa-2 w-25"
           v-for="(group, i) in groups"
           :key="i">
        <v-card min-height="190" link>
        <router-link to="/group" style="text-decoration: none; color: inherit;">
        <v-card-item>
          <v-card-title v-text="group.title"></v-card-title>
          <v-card-subtitle v-text="group.category"></v-card-subtitle>
        </v-card-item>
        <v-card-text>
          {{group.memberCount}} / {{group.headcount}}
        </v-card-text>
        <v-card-actions>
          <v-chip-group>
            <v-chip
                v-for="tag in group.studies"
                :key="tag.id"
                size="small"
                variant="text">
              #{{tag.title}}
            </v-chip>
          </v-chip-group>
        </v-card-actions>
        </router-link>
      </v-card>
      </div>
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
import StudyGroupCreate from "@/components/study/StudyGroupCreate";
export default {
  name: "StudyList",
  components: {StudyGroupCreate},
  data: () => ({
    groups: [
      {
        title: "테스트 그룹",
        category: "취직",
        headcount: 30,
        memberCount: 10,
        studies: [{id:1, title:"테스트1"}, {id:2, title:"테스트2"}]
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5,
        studies: [{id:3, title:"spring"}, {id:4, title:"vue.js"}]
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5,
        studies: [],
      },
      {
        title: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5,
        studies: [],
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
.study-list {
  display: flex;
  flex-wrap: wrap;
}
</style>