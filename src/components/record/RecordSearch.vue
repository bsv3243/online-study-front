<template>
  <v-sheet min-height="200" rounded="lg">
    <v-container>
    <v-form>
      <v-text-field density="compact" variant="outlined" label="검색" />
    </v-form>
    <div>
      <v-chip-group
          v-model="select"
          column>
        <v-chip
            v-for="study in studies"
            :key="study.id"
            filter>
          {{study.name}}
        </v-chip>
      </v-chip-group>
    </div>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "RecordSearch",
  data:() => ({
    select: [],
    studies: [
      {
        id: 1,
        name: "spring"
      },
      {
        id: 2,
        name: "vue.js"
      },
      {
        id: 3,
        name: "react"
      },
      {
        id: 4,
        name: "unity"
      },
      {
        id: 5,
        name: "unreal"
      }
    ]
  })
}
</script>

<style scoped>

</style>