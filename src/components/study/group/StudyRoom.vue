<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-col cols="5">
        <v-card min-height="10vh">
          <v-card-text>12명 공부 중</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card min-height="10vh">
          <v-container>
            <v-menu
                v-model="menu"
              :close-on-content-click="false">
              <template v-slot:activator="{props}">
                <v-btn v-bind="props">
                  추가
                </v-btn>
              </template>
              <v-card class="pa-2" min-width="300">
                <v-form>
                  <v-text-field label="검색" density="compact" variant="solo">
                  </v-text-field>
                </v-form>

                <v-chip-group  multiple selected-class="text-primary">
                  <v-chip v-for="study in studies" :key="study.id">
                    {{study.name}}
                  </v-chip>
                </v-chip-group>

                <v-card-actions>
                  <v-spacer/>
                  <v-btn variant="text" @click="menu=false">
                    취소
                  </v-btn>
                  <v-btn variant="text" @click="menu=false">
                    추가
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-btn>
              시작
            </v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <div class="room">
          <StudyMember
              v-for="(member, i) in members"
              :key="i"
              :member="member"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StudyMember from "@/components/study/group/StudyMember";
export default {
  name: "StudyRoom",
  components: {StudyMember},
  watch: {
    selectedStudies(value) {
      console.log(value);
    }
  },
  data: () => ({
    menu: false,

    img: require('@/assets/img/study_icon.png'),
    members: [
      {
        nickname: "테스터",
        time: "05:55"
      },
      {
        nickname: "테스터",
        time: "05:55"
      },
      {
        nickname: "테스터",
        time: "05:55"
      },
      {
        nickname: "테스터",
        time: "05:55"
      },
      {
        nickname: "테스터",
        time: "05:55"
      },
      {
        nickname: "테스터",
        time: "05:55"
      },
    ],
    studies: [
      {
        id: "1",
        name: "스프링"
      },
      {
        id: "2",
        name: "백엔드"
      }
    ],
    selectedStudies: [],
  }),
  mounted() {
  }
}
</script>

<style scoped>
  .room {
    min-height: 70vh;
    border: 2px solid #d9d9d9;
    border-radius: 10px;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
  }
</style>