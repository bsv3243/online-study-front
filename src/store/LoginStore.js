import {defineStore} from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => ({
        loginAt: null,
        login: false,
        loginDialog: false,
        memberId: null,
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
        },
        getMemberId() {
            return this.memberId;
        }
    },
    actions: {
        setLogin(memberId) {
            this.login = true
            this.loginAt = new Date();
            this.loginDialog = false;
            this.memberId = memberId;
        },
        logout() {
            this.login = false;
            this.loginAt = null
            this.memberId = null;
        },
        setLoginDialog(flag) {
            this.loginDialog = flag
        }
    }
    ,
    persist: true
})