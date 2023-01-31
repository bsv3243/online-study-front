import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import StudyGroup from "@/components/study/StudyGroup";

const routes = [
    {path: "/", name: "AppStudy", component: AppStudy},
    {path: "/group", name: "StudyGroup", component: StudyGroup},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
