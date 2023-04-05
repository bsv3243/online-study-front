<template>
  <v-sheet>
    <v-container>
      <div>카테고리</div>
        <v-container class="category-container">
          <div class="category-link"
               :class="{'selected-category': category.value === selectedCategory.value}"
               v-for="category in postCategories"
               :key="category.value"
               @click="selectCategory(category)">
            {{category.name}}
          </div>
        </v-container>
    </v-container>
  </v-sheet>
</template>

<script>
import {useCommunityStore} from "@/store/CommunityStore";

export default {
  name: "CommunityCategorySelect",
  setup() {
    const communityStore = useCommunityStore();

    return {communityStore}
  },
  data:() => ({
    postCategories: [
      {
        value: "INFO",
        name: "정보"
      },
      {
        value: "QUESTION",
        name: "질문&답변"
      },
      {
        value: "CHAT",
        name: "잡담"
      }
    ],
    selectedCategory: {}
  }),
  mounted() {
    this.selectedCategory.value = this.communityStore.getCategory
    this.selectedCategory.name = this.getCategoryName(this.selectedCategory.value);
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;

      this.communityStore.updateCategory(category);

      this.$emit("selectedCategory", category);
    },
    getCategoryName(value) {
      for(const category of this.postCategories) {
        if(category.value === value) {
          return category.name;
        }
      }
    }
  }
}
</script>

<style scoped>
.category-link:hover {
  color: #999999;
  cursor: pointer;
}
.selected-category {
  color: burlywood;
}
.selected-category:hover {
  color: burlywood;
}
.category-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
}
</style>