<template>
  <v-responsive class="mx-auto" max-width="1200px">
    <v-sheet height="90vh">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn v-if="!isMember"
                   @click="isMember=true"
                   min-height="9vh"
                   block
                   variant="elevated">
              <div class="d-flex flex-column align-center">
                <SvgIcon type="mdi" :path="mdiDeskLampOn"></SvgIcon>
                그룹 참여
              </div>
            </v-btn>
            <v-card v-if="isMember"
                    class="d-flex flex-column align-center justify-center"
                    min-height="9vh">
              <p>참여일</p>
              <p>{{joinedAt}}</p>
            </v-card>
            <v-list class="mt-2" density="compact" nav>
              <v-list-item title="공부방" value="room" @click="select='room'"></v-list-item>
              <v-list-item title="커뮤니티" value="community" @click="select='community'"></v-list-item>
              <v-list-item title="탈퇴하기" v-if="isMember" @click="isMember=false"></v-list-item>
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
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDeskLampOn } from '@mdi/js';

import StudyRoom from "@/components/study/group/StudyRoom";
import StudyCommunity from "@/components/study/group/StudyCommunity";
import StudyGroupInfo from "@/components/study/group/StudyGroupInfo";
export default {
  name: "StudyGroup",
  components: {SvgIcon, StudyGroupInfo, StudyCommunity, StudyRoom},
  watch: {
    select(value) {
      console.log(value);
    }
  },
  data: () => ({
    select: "room",
    isMember: false,
    joinedAt: "2023-01-23",
    mdiDeskLampOn,
  }),
  methods: {
  }
}
</script>

<style scoped>
</style>