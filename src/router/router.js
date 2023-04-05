import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import StudyGroup from "@/components/study/StudyGroup";
import AppRecord from "@/components/AppRecord";
import SignupForm from "@/components/login/SignupForm";
import CommunityPost from "@/components/study/group/CommunityPost";
import WritePost from "@/components/community/WritePost";
import AppCommunity from "@/components/AppCommunity";
import CommunityPostV2 from "@/components/community/CommunityPostV2";
import AppProfile from "@/components/AppProfile";

const routes = [
    {path: "/", name: "AppStudy", component: AppStudy},
    {path: "/record", name: "AppRecord", component: AppRecord},
    {path: "/group/:groupId", name: "StudyGroup", component: StudyGroup},
    {path: "/signup", name: "SignupForm", component: SignupForm},
    {path: "/group/:groupId/post/:postId", name: "CommunityPost", component: CommunityPost},
    {path: "/group/:groupId/post/new", name: "WritePost", component: WritePost},
    {path: "/community", name: "AppCommunity", component: AppCommunity},
    {path: "/community/:postId", name: "CommunityPostV2", component: CommunityPostV2},
    {path: "/profile", name: "AppProfile", component: AppProfile}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
