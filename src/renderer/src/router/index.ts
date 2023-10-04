import { createRouter, createWebHistory } from 'vue-router'
import homepage from '@renderer/page/home-page/index.vue'
import orderpage from '@renderer/page/order-page/index.vue'
const routers = [
    { path: '/', redirect: '/mainpage' },
    {
        path: '/mainpage',
        component: homepage,
    },
    {
        path: '/orderpage',
        component: orderpage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers,
})

export default router
