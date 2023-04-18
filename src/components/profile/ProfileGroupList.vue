<template>
  <div class="base-container">
    <div class="title">
      <span>그룹 관리</span>
      <div>
        <v-pagination v-model="page" :length="pageInfo.totalPages" total-visible="5"></v-pagination>
      </div>
    </div>
    <div class="group-container" v-if="dataReady">
      <div class="card-container" v-for="group in groups" :key="group.groupId">
        <div class="group-card">
          <span>{{ group.name }}</span>
          <span>가입일 {{ getYMD(group.createdAt) }}</span>
          <div class="card-action">
            <v-btn @click="moveTo(group.groupId)" variant="tonal">바로가기</v-btn>
            <v-btn v-if="!isMaster(group.groupMembers)"
                   @click="quitGroup(group.groupId)" variant="tonal">탈퇴</v-btn>
            <v-btn v-if="isMaster(group.groupMembers)"
                   @click="deleteGroup(group.groupId)" variant="tonal">삭제</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="align-self-end">
      <v-btn @click="deleteGroups" variant="tonal">전체 삭제</v-btn>
      <v-btn @click="quitGroups" class="ml-1" variant="tonal">전체 탈퇴</v-btn>
    </div>
  </div>
</template>

<script>
import {useLoginStore} from "@/store/LoginStore";
import moment from "moment";

export default {
  name: "ProfileGroupList",
  setup() {
    const loginStore = useLoginStore();

    return {loginStore}
  },
  data:() => ({
    memberId: null,
    page: 1,
    groups:[
      {
        groupId: 1,
        name: "그룹이름",
        headcount: 30,
        createdAt: "2023-04-05",
        groupMembers: []
      }
    ],
    groupsGetRequest: {
      page: 0,
      size: 4,
      memberId: null,
    },
    pageInfo: {
      number: 0,
      size: 4,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    },
    dataReady: false,
  }),
  watch: {
    page() {
      this.init()
    }
  },
  mounted() {
    this.init()


  },
  methods: {
    async init() {
      this.memberId = this.loginStore.getMemberId

      this.groupsGetRequest.page = this.page-1
      this.groupsGetRequest.memberId = this.memberId
      this.groups = await this.groupsGetApiCall()

      this.dataReady = true;
    },
    async groupsGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/groups", {
          params: this.groupsGetRequest
        });

        this.pageInfo = response.data;

        console.log(this.pageInfo)

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    getYMD(createdAt) {
      return moment(createdAt).format().substring(0, 10)
    },
    moveTo(groupId) {
      this.$router.push("/group/" + groupId);
    },
    isMaster(groupMembers){
      const groupMaster = groupMembers.find(groupMember => groupMember.role==="MASTER");

      return groupMaster.memberId === this.memberId;
    },
    async quitGroup(groupId) {
      await this.quitGroupApiCall(groupId)
    },
    async quitGroupApiCall(groupId) {
      try{
        await this.axios.post("/api/v1/groups/"+groupId+"/quit");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup(groupId) {
      await this.deleteGroupApiCall(groupId);

      this.groups = await this.groupsGetApiCall()
    },
    async deleteGroupApiCall(groupId) {
      try{
        await this.axios.delete("/api/v1/groups/"+groupId);
      } catch (err) {
        console.log(err);
      }
    },
    async quitGroups() {
      const request = {
        memberId: this.memberId
      }
      await this.quitGroupsApiCall(request);

      await this.init();
    },
    async quitGroupsApiCall(request) {
      try {
        await this.axios.post("/api/v1/groups/quit", request)
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroups() {
      const request = {
        memberId: this.memberId
      }
      await this.deleteGroupsApiCall(request)

      await this.init()
    },
    async deleteGroupsApiCall(request) {
      try {
        await this.axios.post("/api/v1/groups/delete", request)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #efefef;
  padding: 30px;
}
.base-container .title {
  display: flex;
  justify-content: space-between;
}
.group-container {
  display: flex;
}
.card-container {
  padding: 5px;
  width: 25%;
}
.group-card {
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 10px;

  border: 2px solid #efefef;
  border-radius: 10px;
}
.group-card .card-action {
  display: flex;
  gap: 5px;
}
</style>