<template>
  <v-dialog
      v-model="loginDialog"
      max-width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">로그인</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-form>
            <v-text-field density="compact" label="아이디"/>
            <v-text-field density="compact" label="비밀번호"/>
          </v-form>
          <v-btn block>로그인</v-btn>
          <div class="d-flex justify-center">
            <v-btn variant="plain">회원가입</v-btn>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginForm",
  data:() => ({
    loginDialog: false,
  })
}
</script>

<style scoped>

</style>