<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet height="90vh">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-card class="pa-2" min-height="9vh">
              <v-btn density="comfortable">참여</v-btn>
            </v-card>
            <v-list class="mt-2" density="compact" nav>
              <v-list-item title="공부방" value="room" @click="select='room'"></v-list-item>
              <v-list-item title="커뮤니티" value="community" @click="select='community'"></v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <StudyGroupInfo/>
            <StudyRoom v-if="select==='room'"/>
            <StudyCommunity v-if="select==='community'"/>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-responsive>
</template>

<script>
import StudyRoom from "@/components/study/group/StudyRoom";
import StudyCommunity from "@/components/study/group/StudyCommunity";
import StudyGroupInfo from "@/components/study/group/StudyGroupInfo";
export default {
  name: "StudyGroup",
  components: {StudyGroupInfo, StudyCommunity, StudyRoom},
  watch: {
    select(value) {
      console.log(value);
    }
  },
  data: () => ({
    select: "room",
  }),
  methods: {
  }
}
</script>

<style scoped>
</style>