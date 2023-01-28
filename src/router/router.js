import AppStudy from "@/components/AppStudy";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import AppRecord from "@/components/AppRecord";

const routes = [
    {path: "/", name: "AppStudy", component: AppStudy},
    {path: "/record", name: "AppRecord", component: AppRecord}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
