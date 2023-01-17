<template>
  <div>
   <v-responsive class="mx-auto" max-width="1200px">
     <v-container>
       <v-row>
         <v-col cols="2">
           <StudyCategory/>
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
import StudyCategory from "@/components/study/StudyCategory";
import StudyList from "@/components/study/StudyList";
export default {
  name: "AppStudy",
  components: {StudyList, StudyCategory}
}
</script>

<style scoped>

</style>