import {defineStore} from 'pinia';

export const useMemberStore = defineStore('member', {
    state: () => ({
        member: null,
    }),
    getters: {
        getMemberId() {
            return this.member.memberId;
        },
        getMember() {
            return this.member;
        }
    },
    actions: {
        setMember(member) {
            this.member = member;
        }
    },
    persist: true
})