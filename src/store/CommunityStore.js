import {defineStore} from 'pinia';

export const useCommunityStore = defineStore('community', {
    state: () => ({
        category: null,
    }),
    getters: {
        getCategory() {
            return this.category
        }
    },
    actions: {
        updateCategory(category) {
            this.category = category;
        },
        initStore() {
            this.category = null;
        }
    },
    persist: true
})