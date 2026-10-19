<template>
      <div class="mask" :class="{ show: appStore.isMobileOpen }" @click="appStore.isMobileOpen = false"></div>
    <div class="sidebar"  :class="{'collapsed': appStore.isCollapse, 'mobile-open': appStore.isMobileOpen}" >
        <div class="logo">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#409eff"/>
                <path d="M2 17L12 22L22 17" stroke="#409eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#409eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="logo-text">后台管理系统</span>
        </div>
        <div class="menu">
             <RouterLink v-for="item in menu" :key="item.path" :to="item.path" class="menu-item"
            active-class="active"
            >
            <svg class="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path :d="iconPath(item.icon)" fill="currentColor"/>
            </svg>
            <span class="menu-text">{{ item.title }}</span>

            </RouterLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import {ref} from 'vue'
import { useAppStore } from '../stores/app'
import { useLoginStore } from '../stores/login'

const loginStore = useLoginStore()

const appStore = useAppStore()
// 这块转换是重点 切记
const menudata = [
    { icon: 'home', title: '首页', path: '/layout/dashboard' },
    { icon: 'users', title: '用户管理', path: '/layout/user' },
    { icon: 'box', title: '商品管理', path: '/layout/produces' },
    { icon: 'order', title: '订单管理', path: '/layout/order' },
]

const getmenu = ()=>{
    if(loginStore.role === 'admin'){
        return menudata
    }
    else{
        return menudata.slice(2,4)
    }
}
const menu = ref(getmenu())
const iconMap: Record<string, string> = {
    home: 'M12 3L2 12H5V20H9V14H15V20H19V12H22L12 3Z',
    users: 'M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.33 13 0 14.34 0 17V19H16V17C16 14.34 10.67 13 8 13ZM16 13C15.5 13 14.94 13.05 14.34 13.14C15.36 13.83 16 14.82 16 16V19H24V17C24 14.34 18.67 13 16 13Z',
    box: 'M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.3L19.5 8L12 11.7L4.5 8L12 4.3ZM4 9.7L11 13.4V19.7L4 16.2V9.7ZM13 19.7V13.4L20 9.7V16.2L13 19.7Z',
    order: 'M7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z',
}

const iconPath = (name:string) => iconMap[name] || ''

</script>

<style scoped>

.sidebar {
    width: 220px;
    height: 100vh;
    background-color: #1f2937;
    display: flex;
    flex-direction: column;
    transition: width 0.2s;
    flex-shrink: 0;
    overflow: hidden;
}
.sidebar.collapsed {
    width: 64px;
}

.sidebar.collapsed .logo-text,
.sidebar.collapsed .menu-text {
    display: none;
}
.logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom: 1px solid #374151;
    flex-shrink: 0;
}


.logo-text {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
}
.menu {
    flex: 1;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 44px;
    padding: 0 14px;
    border-radius: 8px;
    color: #9ca3af;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.2s, color 0.2s;
    white-space: nowrap;
}


.sidebar.collapsed .menu-item {
    justify-content: center;
    padding: 0;
}

.menu-item:hover {
    background-color: #374151;
    color: #fff;
}

.menu-item.active {
    background-color: #409eff;
    color: #fff;
}

.menu-icon {
    flex-shrink: 0;
}

.menu-text {
    overflow: hidden;
}
@media screen and (max-width: 991px) {
    /* 平板端：无论 isCollapse 是什么，都强制图标栏 */
    .sidebar,
    .sidebar.collapsed {
        width: 64px;
    }

    .logo-text,
    .menu-text {
        display: none;
    }

    .logo {
        padding: 0;
    }

    .menu-item {
        justify-content: center;
        padding: 0;
    }
}
@media screen and (max-width: 767px) {
    /* 侧栏变成浮层，默认移出屏幕左侧 */
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 220px;
        height: 100vh;
        z-index: 1001;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }

    /* 打开时滑入 */
    .sidebar.mobile-open {
        transform: translateX(0);
    }

    /* 抽屉里正常显示文字和左对齐布局 */
    .logo-text,
    .menu-text {
        display: inline;
    }

    .logo {
        justify-content: flex-start;
        padding: 0 16px;
    }

    .menu-item {
        justify-content: flex-start;
        padding: 0 14px;
    }

    /* 遮罩铺满全屏，打开时淡入 */
    .mask {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
    }
 
    .mask.show {
        opacity: 1;
        visibility: visible;
    }
}
</style>