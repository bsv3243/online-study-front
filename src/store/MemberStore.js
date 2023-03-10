import {defineStore} from 'pinia';

export const useMemberStore = defineStore('member', {
    state: () => ({
        member: null,
    }),
    getters: {
        getMemberId() {
            return this.member.memberId;
        }
    },
    actions: {
        setMember(member) {
            this.member = member;
        }
    }
})