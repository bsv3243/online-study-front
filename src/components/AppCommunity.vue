<template>
  <div>
    <v-responsive class="mx-auto" max-width="1100px">
      <v-container>
        <v-row>
          <div class="left">
              <community-category-select/>
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
import {useCommunityStore} from "@/store/CommunityStore";
import {watch} from "vue";
export default {
  name: "AppCommunity",
  components: {CommunityPostListByCategory, CommunityCategorySelect, CommunityPostList},
  setup() {
    const communityStore = useCommunityStore();

    return {communityStore}
  },
  data: () => ({
    selectedCategory: null
  }),
  mounted() {
    this.selectedCategory = this.communityStore.getCategory
    watch(() => this.communityStore.category, () => {
      this.selectedCategory = this.communityStore.getCategory
      console.log(this.selectedCategory)
    })
  },
  methods: {
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