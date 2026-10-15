import { createRouter, createWebHashHistory } from 'vue-router'
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name:'login',
            component: () => import('../view/Login.vue')
        },
        {
            path: '/layout',
            component: () => import('../layouts/layout.vue'),
            children: [
                {
                    path: 'user',
                    component: () => import('../view/user.vue')
                },
                {
                    path: 'order',
                    component: () => import('../view/order.vue')
                },
                {
                    path: 'produces',
                    component: () => import('../view/produces.vue')
                },
                {
                    path: 'dashboard',
                    component: () => import('../view/dashBoard.vue')
                },
                {
                    path: 'profile',
                    component: () => import('../view/profile.vue')
                },
            ]
        }
        
    ]
})