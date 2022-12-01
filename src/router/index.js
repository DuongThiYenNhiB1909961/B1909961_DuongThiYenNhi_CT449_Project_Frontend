import { createWebHistory, createRouter } from "vue-router";
import LiteraryBook from "@/views/LiteraryBook.vue";
import SignIn from "@/views/signin.vue";
const routes = [
    {
        path: "/",
        name: "SignIn",
        component: SignIn,
    },
    {
        path: "/manager",
        name: "LiteraryBook",
        component: LiteraryBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/literaries/:id",
        name: "literary.edit",
        component: () => import("@/views/LiteraryEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/literaries/add",
        name: "literary.add",
        component: () => import("@/views/LiteraryAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/users/add",
        name: "user.add",
        component: () => import("@/views/signup.vue"),
        props: true
    },
    // {
    //     path: "/",
    //     name: "user.signIn",
    //     component: () => import("@/views/signin.vue"),
    // },   
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
    