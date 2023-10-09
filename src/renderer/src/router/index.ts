import { createRouter, createWebHistory } from 'vue-router'
import homepage from '@renderer/page/home-page/index.vue'
import orderpage from '@renderer/page/order-page/index.vue'
import pianopage from '@renderer/page/piano-page/index.vue'
import playListPage from '@renderer/page/play-list-page/index.vue'
const routers = [
    { path: '/', redirect: '/mainpage' },
    {
        path: '/mainpage',
        component: homepage,
    },
    {
        path: '/playlistpage',
        component: playListPage,
    },
    {
        path: '/orderpage',
        component: orderpage,
    },
    {
        path: '/pianopage',
        component: pianopage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers,
})

export default router
