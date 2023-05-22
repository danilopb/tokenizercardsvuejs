import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../ui/views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../ui/Layout/WebLayout.vue"),
        children: [
            {
                path: "/",
                name: "login",
                component: LoginView
            }
        ]
    },
    {
        path: "/admin",
        component: () => import("../ui/Layout/AdminLayout.vue"),
        children: [
            {
                path: "search-card",
                name: "search_card",
                component: () => import(/* webpackChunkName: "about" */ "../ui/views/SearchCardView.vue")
            },
            {
                path: "tonization-card",
                name: "tonization_card",
                component: () => import(/* webpackChunkName: "about" */ "../ui/views/TokenizationView.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
