<template>
  <v-card>
    <v-container class="d-flex justify-space-between align-center">
      <v-card-title>
<!--        테스트 그룹-->
        {{group.name}}
      </v-card-title>
      <v-card-subtitle>
<!--        중요한 것은 꺾이지 않는 마음-->
        {{group.description}}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click="showGroupInfo = !showGroupInfo">
          더보기
        </v-btn>
      </v-card-actions>
    </v-container>
    <v-expand-transition>
      <div v-show="showGroupInfo">
        <v-card-text>
          <v-container>

            <v-row>
              <v-col>
                <div>그룹장: {{ master.username }}</div>
              </v-col>
              <v-col>
                <div>그룹 생성일: {{group.createdAt}}</div>
              </v-col>
              <v-col>
                <div>인원수: {{group.groupMembers.length}} / {{group.headcount}}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>카테고리: {{group.category}}</div>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "StudyGroupInfo",
  props: {
    group: Object
  },
  data:() => ({
    showGroupInfo: false,
    master: "tester"
  }),
  mounted() {
    this.master = this.group.groupMembers.find(m => m.role === "MASTER")
    console.log(this.group)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>