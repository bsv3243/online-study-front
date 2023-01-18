<template>
  <div>
   <v-responsive class="mx-auto" max-width="1200px">
     <v-container>
       <v-row>
         <v-col cols="2">
           <StudySort/>
         </v-col>
         <v-col>
            <StudyList/>
         </v-col>
       </v-row>
     </v-container>
   </v-responsive>
  </div>
</template>

<script>
import StudyList from "@/components/study/StudyList";
import StudySort from "@/components/study/StudySort";
export default {
  name: "AppStudy",
  components: {StudySort, StudyList}
}
</script>

<style scoped>
</style>