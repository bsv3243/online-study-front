import {defineStore} from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => ({
        loginAt: null,
        loginDialog: false,
    }),
    getters: {
        isLogin() {
            return this.loginAt !== null;
        },
        getLoginDialog() {
            return this.loginDialog;
        },
        test() {
            return this.loginAt;
        }
    },
    actions: {
        login() {
            this.loginAt = new Date();
            this.loginDialog = false;
        },
        logout() {
            this.loginAt = null
        },
        setLoginDialog(flag) {
            this.loginDialog = flag
        }
    }
    ,
    persist: true
})