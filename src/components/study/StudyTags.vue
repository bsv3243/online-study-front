<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <v-form>
            <v-text-field label="태그" variant="outlined" density="compact">

            </v-text-field>
          </v-form>
          <v-chip-group
              v-model="selected"
              column
              multiple>
            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              variant="outlined"
              size="small"
              filter>
              # {{tag.title}}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "StudyTags",
  data: () => ({
    tags: [
      {
        id: 1,
        title: "spring"
      },
      {
        id: 2,
        title: "테스트1"
      },
      {
        id: 3,
        title: "vue.js"
      },
      {
        id: 4,
        title: "테스트2"
      }
    ],
    selected: [],
  })
}
</script>

<style scoped>

</style>