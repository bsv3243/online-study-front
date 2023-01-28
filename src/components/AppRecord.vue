<template>
  <div>
    <v-responsive class="mx-auto" max-width="1200px">
      <v-container>
        <v-row>
          <div class="left">
          </div>
          <v-col>
            <RecordList/>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
import RecordList from "@/components/record/RecordList";
export default {
  name: "AppRecord",
  components: {RecordList},
  data:() => ({
  })
}
</script>

<style scoped>
.left {
  margin-top: 12px;
  width: 200px;
}
</style>