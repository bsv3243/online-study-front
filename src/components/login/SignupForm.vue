<template>
  <div>
    <v-sheet min-height="100vh">
    <v-responsive class="mx-auto" max-width="350">
      <v-container>
        <div class="py-4 text-center text-h4">회원가입</div>
        <v-form>
          <v-text-field density="compact"
                        variant="solo"
                        v-model="signupRequest.username"
                        label="아이디"/>
          <v-text-field density="compact"
                        variant="solo"
                        hint="비밀번호는 8자 이상, 20자 이하여야 합니다."
                        type="password"
                        v-model="signupRequest.password"
                        label="비밀번호"/>
          <v-text-field density="compact"
                        variant="solo"
                        :rules="[
                            v => v===this.signupRequest.password || '비밀번호가 일치하지 않습니다.'
                        ]"
                        type="password"
                        v-model="passwordCheck"
                        label="비밀번호 확인"/>
        </v-form>
        <v-btn block
               @click="signUpApiCall">가입하기</v-btn>
      </v-container>
    </v-responsive>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data:() => ({
    passwordFocus: false,
    signupRequest: {
      username: "",
      password: ""
    },
    passwordCheck: "",
  }),
  methods: {
    async signUpApiCall() {
      if(this.signupRequest.password !== this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    }
  }
}
</script>

<style scoped>

</style>