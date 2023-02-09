<template>
  <v-card>
    <v-container class="d-flex justify-space-between align-center">
      <v-card-title>
        테스트 그룹
      </v-card-title>
      <v-card-subtitle>
        중요한 것은 꺾이지 않는 마음
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
                <div>그룹장: 테스트유저</div>
              </v-col>
              <v-col>
                <div>그룹 생성일: 2023-01-12</div>
              </v-col>
              <v-col>
                <div>인원수: 25 / 30</div>
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
  props: ["group"],
  data:() => ({
    showGroupInfo: false,
  })
}
</script>

<style scoped>

</style>