import {defineStore} from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => ({
        loginAt: null
    }),
    getters: {
        isLogin() {
            return this.loginAt !== null;
        },
        test() {
            return this.loginAt;
        }
    },
    actions: {
        login() {
            this.loginAt = new Date();
        },
        logout() {
            this.loginAt = null
        }
    },
    persist: true
})