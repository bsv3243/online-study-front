import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import StudyGroup from "@/components/study/StudyGroup";
import AppRecord from "@/components/AppRecord";

const routes = [
    {path: "/", name: "AppStudy", component: AppStudy},
    {path: "/record", name: "AppRecord", component: AppRecord}
    {path: "/group", name: "StudyGroup", component: StudyGroup},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
