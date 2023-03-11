<template>
  <div>
   <v-responsive class="mx-auto" max-width="1200px">
     <v-container>
       <v-row>
         <div class="left">
           <StudySort/>
           <StudyTags class="mt-10" @studyIds="setStudyIds"/>
         </div>
         <v-col>
            <StudyGroupList :studyIds="studyIds"/>
         </v-col>
       </v-row>
     </v-container>
   </v-responsive>
  </div>
</template>

<script>
import StudyGroupList from "@/components/study/StudyGroupList";
import StudySort from "@/components/study/StudySort";
import StudyTags from "@/components/study/StudyTags";
export default {
  name: "AppStudy",
  components: {StudyTags, StudySort, StudyGroupList},
  data:() => ({
    studyIds: [],
  }),
  methods: {
    setStudyIds(value) {
      this.studyIds = value
    },
  }
}
</script>

<style scoped>
.left {
  margin-top: 12px;
  width: 200px;
}
</style>