import { createRouter, createWebHashHistory } from 'vue-router';
import TopView from "@/views/TopView.vue";
import PostView from "@/views/PostView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CreatePostView from "@/views/CreatePostView.vue";
import { ref, computed } from "vue";

const routes = [
    {
        path: '/top',
        component: TopView,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id',
        name: 'PostView',
        component: PostView
    },
    {
        path: '/profile',
        component: ProfileView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/signup',
        component: SignUpView
    },
    {
        path: '/',
        component: LoginView
    },
    {
        path: '/createPost',
        component: CreatePostView
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export const id = ref(localStorage.getItem('id') || null);

// Observador de cambios en la variable ID
export const idComputed = computed({
    get: () => id.value,
    set: (newValue) => {
        id.value = newValue;
        localStorage.setItem('id', JSON.stringify(newValue));
    }
});

const localStorageKey = 'isLoggedIn';
const getLocalStorageValue = () => localStorage.getItem(localStorageKey);
export const isLoggedIn = ref(getLocalStorageValue() ? JSON.parse(getLocalStorageValue()) : false);

export const isLoggedInComputed = computed({
    get: () => isLoggedIn.value,
    set: (value) => {
        isLoggedIn.value = value;
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedInComputed.value) {
        next('/login');
    } else {
        next();
    }
});

export default router;