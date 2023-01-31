<template>
  <div>
    <v-responsive class="mx-auto" max-width="1200px">
      <v-container>
        <v-row>
          <div class="left">
            <RecordSearch/>
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
import RecordSearch from "@/components/record/RecordSearch";
export default {
  name: "AppRecord",
  components: {RecordSearch, RecordList},
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