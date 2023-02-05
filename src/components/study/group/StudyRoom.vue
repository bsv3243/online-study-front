<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-col cols="5">
        <v-card min-height="12vh">
          <v-card-text>12명 공부 중</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card min-height="12vh">
          <v-card-text class="d-flex">
            <p v-if="selectedStudy instanceof Array">선택된 공부가 없습니다.</p>
            <p v-text="selectedStudy.name"></p>
            <p v-text="selectedStudy.time"></p>
          </v-card-text>
          <v-card-actions>
            <v-menu
                v-model="menu"
              :close-on-content-click="false">
              <template v-slot:activator="{props}">
                <v-btn v-bind="props">
                  변경
                </v-btn>
              </template>
              <v-card class="pa-2" min-width="300">
<!--                <v-form>-->
<!--                  <v-text-field label="검색" density="compact" variant="solo">-->
<!--                  </v-text-field>-->
<!--                </v-form>-->

                <v-list
                    nav>
                  <v-list-item
                    v-for="study in studies"
                    :key="study.id"
                    :value="study.id"
                    @click="selectedStudy=study"
                    active-color="primary"
                  >
                    <v-list-item-title>{{study.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{study.time}}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <v-card-actions>
                  <v-btn variant="text" @click="test">
                    닫기
                  </v-btn>
                  <v-spacer/>
                  <AddStudyDialog :studies="studies" @selectedStudy="addStudy"/>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-spacer/>
            <v-btn>
              시작
            </v-btn>
          </v-card-actions>
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
import AddStudyDialog from "@/components/study/group/AddStudyDialog";
export default {
  name: "StudyRoom",
  components: {AddStudyDialog, StudyMember},
  watch: {
    notSelected() {
    }
  },
  data: () => ({
    menu: false,
    showDialog: false,

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
        name: "스프링",
        time: "3시간 30분"
      },
      {
        id: "2",
        name: "백엔드",
        time: "2시간 12분"
      }
    ],
    selectedStudy: [],

  }),
  methods: {
    test() {
      this.menu = false;
    },
    addStudy(value) {
      this.studies.push(value)
    }
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