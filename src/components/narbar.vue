<template>
    <div class="narbar">
        <div class="narbar-left">
            <button class="icon-btn" @click="toggleMenu">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="#606266" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="narbar-right">
            <button class="icon-btn" title="亮色">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" stroke="#606266" stroke-width="2"/>
                    <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="#606266" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <button class="icon-btn" title="暗色">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="#606266" stroke-width="2" stroke-linejoin="round"/>
                </svg>  
            </button>
            <div class="user">
                <div class="avatar">
                    <RouterLink to="/layout/profile">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#fff"/>
                    </svg>
                    </RouterLink>
                </div>
                <span class="username">欢迎，admin</span>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import {useAppStore} from '../stores/app'
const appStore = useAppStore()
const toggleMenu = () => {
    if (window.innerWidth <= 767) {
        // 手机：开/关抽屉
        appStore.isMobileOpen = !appStore.isMobileOpen
    } else {
        // 桌面/平板：折叠/展开
        appStore.isCollapse = !appStore.isCollapse
    }
}
</script>

<style scoped>
.narbar {
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ebeef5;
}

.narbar-left,
.narbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon-btn {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.icon-btn:hover {
    background-color: #f0f2f5;
}

.user {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 4px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #409eff, #66b1ff);
    display: flex;
    justify-content: center;
    align-items: center;
}

.username {
    font-size: 14px;
    color: #606266;
}
</style>