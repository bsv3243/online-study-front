<template>
  <div>
    <v-responsive class="mx-auto" max-width="1100px">
      <v-container>
        <v-row>
          <div class="left">
              <community-category-select @selected-category="selectCategory"/>
          </div>
          <v-col>
            <community-post-list v-if="!selectedCategory"/>
            <community-post-list-by-category v-if="selectedCategory"/>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>

import CommunityPostList from "@/components/community/CommunityPostList";
import CommunityCategorySelect from "@/components/community/CommunityCategorySelect";
import CommunityPostListByCategory from "@/components/community/CommunityPostListByCategory";
export default {
  name: "AppCommunity",
  components: {CommunityPostListByCategory, CommunityCategorySelect, CommunityPostList},
  data: () => ({
    selectedCategory: null
  }),
  mounted() {
    this.selectedCategory = null
  },
  methods: {
    selectCategory(value) {
      this.selectedCategory = value
      console.log(this.selectedCategory)
    }
  }
}
</script>

<style scoped>
.category-selector {
  width: 180px;
}
.left {
  margin-top: 12px;
  width: 200px;
}
</style>