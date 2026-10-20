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
            meta:{
                requiredAuth:true,
                title:'首页',
            },
            children: [
                {
                    path: 'user',
                    component: () => import('../view/user.vue'),
                    meta:{
                        requiredAuth:true,
                        title:'用户管理',
                    },
                    children:[
                        {
                            path:'watchuser/:id',
                            component:() => import('../view/watch/watchuser.vue'),
                            meta:{
                                requiredAuth:true,
                                title:'查看用户',
                            }
                        }
                    ]
                },
                {
                    path: 'order',
                    component: () => import('../view/order.vue'),
                    meta:{
                        requiredAuth:true,
                        title:'订单管理',
                    }
                },
                {
                    path: 'produces',
                    component: () => import('../view/produces.vue'),
                    meta:{
                        requiredAuth:true,
                        title:'商品管理',
                    }
                },
                {
                    path: 'dashboard',
                    component: () => import('../view/dashBoard.vue'),
                    meta:{
                        requiredAuth:true,
                        title:'仪表盘',
                    }
                },
                {
                    path: 'profile',
                    component: () => import('../view/profile.vue'),
                    meta:{
                        requiredAuth:true,
                        title:'个人中心',
                    }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../view/404.vue'),
            meta:{
                requiredAuth:true,
                title:'404',
            }
        },
        
    ]
})

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem('token')
    const needAuth = to.matched.some(item => item.meta.requiredAuth)

    if(needAuth){
        if(!token){
            next({path:'/',query:{redirect:to.fullPath}})
        }
        else{
            next()
        }
    }
    else{
        if(token && to.path === '/'){
            next({path:'/layout/dashboard'})
        }
        else{
            next()
        }
    }
})