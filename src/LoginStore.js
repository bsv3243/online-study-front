import {defineStore} from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => ({
        loginAt: null,
        login: false,
        loginDialog: false,
    }),
    getters: {
        isLogin() {
            return this.login;
        },
        getLoginDialog() {
            return this.loginDialog;
        },
        test() {
            return this.loginAt;
        }
    },
    actions: {
        setLogin() {
            this.login = true
            this.loginAt = new Date();
            this.loginDialog = false;
        },
        logout() {
            this.login = false;
            this.loginAt = null
        },
        setLoginDialog(flag) {
            this.loginDialog = flag
        }
    }
    ,
    persist: true
})