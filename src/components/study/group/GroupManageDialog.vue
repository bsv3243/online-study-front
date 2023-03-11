<template>
  <v-dialog
      v-model="showDialog"
      persistent
      max-width="350">
    <v-card>
      <v-card-title>
        그룹 관리
      </v-card-title>
      <v-card-text>
        <div class="info">
          <div class="info-inner">
            <span>그룹 설명</span>
          </div>
        </div>
        <div class="div-form d-flex">
          <input placeholder="그룹에 대한 한 한줄 요약">
        </div>
        <v-divider class="my-3"/>
        <div class="info">
          <div class="info-inner">
            <span>그룹 삭제</span>
          </div>
        </div>
        <v-btn color="red" @click="groupDeleteApiCall">그룹 삭제</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="showDialog = false">
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Tiptap from "@/components/editor/Tiptap";
export default {
  name: "GroupManageDialog",
  components: {
    Tiptap

  },
  props: {
    showManageDialog: Boolean,
    groupId: Number
  },
  watch: {
    showManageDialog() {
      if(this.showManageDialog) {
        console.log(this.showManageDialog)
        this.showDialog = true;
      }
    },
    showDialog() {
      if(!this.showDialog) {
        this.emitFalse()
      }
    }
  },
  data:() => ({
    showDialog: false
  }),
  methods: {
    emitFalse() {
      this.$emit("emitFalse", false)
    },
    async groupDeleteApiCall() {
      if(confirm("삭제하시겠습니까? \n삭제 후 되돌릴 수 없습니다.")) {
        try {
          await this.axios.delete("http://localhost:8080/api/v1/group/" + this.groupId)

          this.$router.push("/")
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.")
          console.log(err)
        }
      }
    },
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  color: #999999;
}
.info-inner {
  display: flex;
  gap: 0.5rem;
}
.form {
  height: 4vh;
  width: 100%;
  font-size: 16px;
  padding-left: 0.5rem;
  outline: 1px solid #e7e7e7;
}
.form:focus {
  outline: 2px solid #616161;
}
.div-form {
  width: 100%;
  outline: 1px solid #e7e7e7;
  border-radius: 0;
}
.div-form:focus-within {
  outline: 2px solid #616161;
}
.div-form input {
  height: 4vh;
  width: 100%;
  font-size: 16px;
  padding-left: 0.5rem;
}
.div-form input:focus {
  outline: none;
}
.div-form button:hover {
  background-color: inherit;
}
.direct-form {
  display: flex;
  align-content: center;
  gap: 1rem;
}
.direct-form span {
  display: flex;
  align-self: center;
  white-space: nowrap;
}
</style>