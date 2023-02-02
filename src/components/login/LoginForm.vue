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
            <v-text-field density="compact"
                          variant="solo"
                          v-model="loginRequest.username"
                          label="아이디"/>
            <v-text-field density="compact"
                          variant="solo"
                          v-model="loginRequest.password"
                          type="password"
                          label="비밀번호"/>
          </v-form>
          <v-btn block @click="loginApiCall">로그인</v-btn>
          <div class="d-flex justify-center">
            <router-link to="/signup" style="text-decoration: none; color: inherit;">
            <v-btn variant="plain" @click="loginDialog=false">회원가입</v-btn>
            </router-link>
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
    loginRequest: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async loginApiCall() {
      try {
        await this.axios.post("http://localhost:8080/api/v1/login", this.loginRequest)
      } catch (err) {
        alert("아이디/비밀번호가 일치하지 않습니다.")
      }
    }
  }
}
</script>

<style scoped>
</style>