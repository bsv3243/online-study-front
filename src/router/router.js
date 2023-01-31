import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import AppRecord from "@/components/AppRecord";
import StudyGroup from "@/components/study/StudyGroup";

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
