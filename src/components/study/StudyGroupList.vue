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
    <v-container class="study-list" v-if="dataReady">
      <div class="pa-2 w-25"
           v-for="(group, i) in groups"
           :key="i">
        <v-card min-height="190" link>
        <router-link :to="/group/+group.groupId" style="text-decoration: none; color: inherit;">
        <v-card-item>
          <v-card-title v-text="group.name"></v-card-title>
          <v-card-subtitle v-text="group.category"></v-card-subtitle>
        </v-card-item>
        <v-card-text>
          {{group.memberSize}} / {{group.headcount}}
        </v-card-text>
        <v-card-actions>
          <v-chip-group>
            <v-chip
                v-for="tag in group.studies.slice(0, 3)"
                :key="tag.id"
                size="small"
                variant="text">
              # {{tag.name}}
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
          :length="response.totalPages"
          :total-visible="7">
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
  props: {
    studyIds: Array
  },
  watch: {
    studyIds() {
      this.groupsGetRequest.studyIds = this.studyIds

      const str = JSON.stringify(this.studyIds);
      const studyIds = str.substring(1, str.length-1);
      if(studyIds.trim() === "") {
        this.groupsGetRequest.studyIds = null;
      }else {
        this.groupsGetRequest.studyIds = studyIds
      }
      this.groupsGetApiCall()
    }
  },
  data: () => ({
    groups: [
      {
        groupId: 0,
        name: "테스트 그룹",
        category: "취직",
        headcount: 30,
        memberCount: 10,
        studies: [{id:1, title:"테스트1"}, {id:2, title:"테스트2"}]
      },
      {
        groupId: 1,
        name: "테스트 그룹2",
        category: "대학생",
        headcount: 30,
        memberCount: 5,
        studies: [{id:3, title:"spring"}, {id:4, title:"vue.js"}]
      },
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

    //axios
    groupsGetRequest: {
      page: 0,
      size: 12,
      category: null,
      search: null,
      studyIds: null,
      orderBy: null,
    },

    //axios Ready
    dataReady: false,
    //axiosResponse 데이터
    response: {
      code: "200",
      data: null,
      size: 1,
      totalPages: 10,
      hasNext: false,
      hasPrevious: false,
    }
  }),
  async mounted() {
    await this.groupsGetApiCall()

    console.log(this.groups)

    this.dataReady = true;
  },
  methods: {
    async groupsGetApiCall() {
      this.groupsGetRequest.page = this.page-1;
      const response
          = await this.axios.get("http://localhost:8080/api/v1/groups", {
            params: {
              page: this.groupsGetRequest.page,
              size: this.groupsGetRequest.size,
              category: this.groupsGetRequest.category,
              search: this.groupsGetRequest.search,
              studyIds: this.groupsGetRequest.studyIds,
              orderBy: this.groupsGetRequest.orderBy
            },

      });
      this.response = response.data;
      this.groups = this.response.data
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