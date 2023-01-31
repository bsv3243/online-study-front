<template>
<!--  <v-card id="desk" class="text-center">-->
<!--    <v-card-title>{{member.nickname}}</v-card-title>-->
<!--    <img :src="img" alt=""/>-->
<!--    <v-card-text class="py-2">{{member.time}}</v-card-text>-->
<!--  </v-card>-->
  <v-menu open-on-hover>
    <template v-slot:activator="{props}" >
      <v-card v-bind="props" id="desk" class="text-center ma-2">
            <v-card-title>{{member.nickname}}</v-card-title>
            <img :src="img" alt=""/>
            <v-card-text class="py-2">{{member.time}}</v-card-text>
      </v-card>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-subtitle>
              닉네임
            </v-card-subtitle>
            <v-card-text>
              {{member.nickname}}
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-subtitle>
              시작 시간
            </v-card-subtitle>
            <v-card-text>
              오전 07:20
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-subtitle>
              종료 시간
            </v-card-subtitle>
            <v-card-text>
              공부 중
           </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-subtitle>
              그룹 가입일
            </v-card-subtitle>
            <v-card-text>
              2023-01-23
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-subtitle>
              출석
            </v-card-subtitle>
            <v-card-text>
              12일째(94%)
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>

    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "StudyMember",
  props:['member'],
  data: () => ({
    img: require('@/assets/img/study_icon.png')
  }),
}
</script>

<style scoped>

</style>