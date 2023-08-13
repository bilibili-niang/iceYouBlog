import { createRouter, createWebHistory } from "vue-router"
import Index from '@/views/index.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

