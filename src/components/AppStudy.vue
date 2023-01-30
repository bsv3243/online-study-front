<template>
  <div>
   <v-responsive class="mx-auto" max-width="1200px">
     <v-container>
       <v-row>
         <div class="left">
           <StudySort/>
           <StudyTags class="mt-10"/>
         </div>
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
import StudyTags from "@/components/study/StudyTags";
export default {
  name: "AppStudy",
  components: {StudyTags, StudySort, StudyList}
}
</script>

<style scoped>
.left {
  margin-top: 12px;
  width: 200px;
}
</style>