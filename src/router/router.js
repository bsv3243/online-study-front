import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const routes = [
    {path: "/", name: "AppStudy", component: AppStudy}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
