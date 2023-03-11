<template>
  <v-sheet height="90vh">
  <v-responsive class="mx-auto" max-width="1200px">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn v-if="!isMember"
                   @click="groupJoinApiCall"
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
              <v-list-item title="탈퇴하기" v-if="isMember && !isMaster" @click="groupQuitApiCall"></v-list-item>
              <v-list-item title="그룹 관리" v-if="isMaster" @click="showManageDialog = true"></v-list-item>
              <group-manage-dialog v-if="isMaster"
                                   :show-manage-dialog="showManageDialog"
                                   :group-id="groupId"
                                   @emitFalse="setMangeDialogFalse"/>
            </v-list>
          </v-col>
          <v-col>
            <StudyGroupInfo :group="group" v-if="dataReady"/>
            <StudyRoom :is-member="isMember" :group="group" v-if="select==='room' && dataReady"/>
            <StudyCommunity :group="group" v-if="select==='community' && dataReady"/>
          </v-col>
        </v-row>
      </v-container>
  </v-responsive>
  </v-sheet>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDeskLampOn } from '@mdi/js';

import StudyRoom from "@/components/study/group/StudyRoom";
import StudyCommunity from "@/components/study/group/StudyCommunity";
import StudyGroupInfo from "@/components/study/group/StudyGroupInfo";
import {useMemberStore} from "@/store/MemberStore";
import GroupManageDialog from "@/components/study/group/GroupManageDialog";
export default {
  name: "StudyGroup",
  components: {GroupManageDialog, SvgIcon, StudyGroupInfo, StudyCommunity, StudyRoom},
  setup() {
    const memberStore = useMemberStore();

    return {memberStore};
  },
  async mounted() {
    this.groupId = this.$route.params.groupId;
    await this.groupGetApiCall()

    if(this.group.groupMembers.some(groupMember => groupMember.memberId===this.memberStore.getMemberId)) {
      const find = this.group.groupMembers.find(groupMember => groupMember.memberId===this.memberStore.getMemberId);
      if(find.role === "MASTER") {
        this.isMaster = true
      }
      this.joinedAt = find.joinedAt.substring(0, 10)
      this.isMember = true
    }
  },
  watch: {
    select(value) {
      console.log(value);
    },
    async isMember() {
      await this.groupGetApiCall()
    }
  },
  data: () => ({
    select: "room",
    isMember: false,
    joinedAt: "2023-01-23",
    groupId: null,
    dataReady: false,
    isMaster: false,
    mdiDeskLampOn,
    showManageDialog: false,

    //axiosResponse 데이터
    group: {
      groupId: 0,
      name: "테스트그룹",
      headcount: 30,
      description: "중요한 것은 꺾이지 않는 마음",
      createdAt: new Date(),
      category: "기타",
      groupMembers: [
        {
          groupMemberId: 0,
          memberId: 0,
          username: "tester",
          nickname: "tester",
          joinedAt: new Date(),
          role: "MASTER"
        }
      ],
      rooms: []
    }
  }),
  methods: {
    async groupGetApiCall() {
      try {
        const response = await this.axios.get("http://localhost:8080/api/v1/group/" + this.groupId);
        this.group = response.data.data;

        this.dataReady = true
      }catch (err) {
        this.$router.push("/")
      }
    },
    async groupJoinApiCall() {
      await this.axios.post("http://localhost:8080/api/v1/group/"+this.groupId+ "/join");

      this.isMember = true;
    },
    async groupQuitApiCall() {
      await this.axios.post("http://localhost:8080/api/v1/group/"+this.groupId + "/quit");

      this.isMember = false;
    },
    async groupDeleteApiCall() {
      try{
        await this.axios.delete("http://localhost:8080/api/v1/group/"+this.groupId)

        this.$router.push("/group")
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.")
        console.log(err)
      }
    },
    setMangeDialogFalse(value) {
      this.showManageDialog = value
    }
  },

}
</script>

<style scoped>
</style>