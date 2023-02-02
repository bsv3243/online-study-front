<template>
  <div>
    <v-sheet min-height="100vh">
    <v-responsive class="mx-auto" max-width="350">
      <v-container>
        <div class="py-4 text-center text-h4">회원가입</div>
        <v-form>
          <v-text-field density="compact"
                        variant="solo"
                        label="아이디"/>
          <v-text-field density="compact"
                        variant="solo"
                        hint="비밀번호는 8자 이상, 20자 이하여야 합니다."
                        label="비밀번호"/>
          <v-text-field density="compact"
                        variant="solo"
                        label="비밀번호 확인" />
        </v-form>
        <v-btn block>가입하기</v-btn>
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
  })
}
</script>

<style scoped>

</style>