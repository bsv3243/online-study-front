<template>
  <div>
    <v-sheet min-height="100vh">
    <v-responsive class="mx-auto" max-width="350">
      <v-container>
        <div class="py-4 text-center text-h4">회원가입</div>
        <form class="d-flex flex-column">
          <div class="input-box">
            <label>아이디</label>
            <input class="sign-up-input"
                   placeholder="email@exmaple.com"
                   v-model="signupRequest.username"/>
          </div>
          <div class="input-box">
            <label>비밀번호</label>
            <input class="sign-up-input"
                   type="password"
                   placeholder="********"
                   v-model="signupRequest.password"
                   @focusin="passwordHint=true"
                   @focusout="passwordHint=false" />
            <p class="password-hint" v-if="passwordHint">비밀번호는 8자 이상, 20자 이하여야 합니다.</p>
          </div>
          <div class="input-box">
            <label>비밀번호 확인</label>
            <input class="sign-up-input"
                   type="password"
                   placeholder="********"
                   v-model="passwordCheck"/>
            <p class="password-check"
               v-if="signupRequest.password !== passwordCheck">비밀번호가 일치하지 않습니다.</p>
          </div>
        </form>
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
      password: "",
      nickname: "",
    },
    passwordCheck: "",
    passwordHint: false,
  }),
  methods: {
    async signUpApiCall() {
      if(this.signupRequest.password !== this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.")
      }
      if(this.signupRequest.nickname === "") {
        this.signupRequest.nickname = this.signupRequest.username
      }

      try {
        const response = await this.axios.post('http://localhost:8080/api/v1/members', this.signupRequest);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
label {
  font-size: 1rem
}
.input-box {
  margin-bottom: 20px;
}
.sign-up-input {
  border: 1px solid #ced4da;
  border-radius: 3px;
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-top: 5px;
}
.password-hint {
  padding-bottom: 0;
  font-size: 0.9rem;
  color: #868686;
}
.password-check {
  font-size: 0.9rem;
  color: red;
}
</style>