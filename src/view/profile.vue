<template>
    <div class="profile">
        <div class="page-header">
            <h2 class="page-title">
                <span class="title-bar"></span>
                个人中心
            </h2>
            <p class="page-desc">管理个人信息，设置账号安全</p>
        </div>
        <div class="contont">
            <!-- 左侧：用户信息卡片 -->
            <div class="contont-left">
                <div class="contont-left-title">
                    <div class="avatar-box">
                        <el-avatar :size="80">{{ loginStore.name.charAt(0) }}</el-avatar>
                    </div>
                    <div class="user-info">
                        <div class="name">
                            <div class="user-name">{{ loginStore.username }}</div>
                            <el-tag size="small" type="primary" effect="dark">{{ roleText }}</el-tag>
                        </div>
                        <div class="explain">{{ roleexplain }}</div>
                    </div>
                </div>
            </div>

            <!-- 右侧：账号信息卡片 -->
            <div class="contont-right">
                <div class="info-title">账号信息</div>
                <el-descriptions :column="1" border>
                    <el-descriptions-item label="姓名">{{ loginStore.name }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ loginStore.phone || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{ loginStore.email || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="角色">{{ roleText }}</el-descriptions-item>
                    <el-descriptions-item label="登录时间">{{ loginTimeText }}</el-descriptions-item>
                </el-descriptions>
                <el-button type='danger' @click="getOut" class="logout-btn">
                    退出登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useLoginStore } from '../stores/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginStore = useLoginStore()

// role 英文 → 中文
const roleText = computed(() => {
    const map: Record<string, string> = { admin: '超级管理员', editor: '运营人员', viewer: '数据查看员' }
    return map[loginStore.role] || loginStore.role
})

// role → 权限说明
const roleexplainmap: Record<string, string> = {
    admin: '系统管理员，拥有全部管理权限',
    editor: '运营人员，拥有部分权限',
    viewer: '数据查看员，有查看的权力'
}

const roleexplain = computed(() => {
    return roleexplainmap[loginStore.role] || '-'
})

// logintime 是毫秒时间戳 → 格式化
const loginTimeText = computed(() => {
    if (!loginStore.logintime) return '-'
    const d = new Date(Number(loginStore.logintime))
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})

const getOut = () => {
    loginStore.out()
    router.push('/')
}
</script>

<style scoped>
.page-header {
    margin-bottom: 10px;
}
.page-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 22px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 8px;
}
.title-bar {
    width: 4px;
    height: 22px;
    background: linear-gradient(180deg, #409eff, #66b1ff);
    border-radius: 2px;
}
.page-desc {
    font-size: 14px;
    color: #909399;
    margin: 0;
}

.contont {
    display: flex;
    gap: 20px;
}

/* 左侧用户信息卡片 */
.contont-left-title {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 30px 28px;
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border-radius: 10px;
    min-width: 380px;
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);
}
.avatar-box :deep(.el-avatar) {
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    border: 2px solid rgba(255, 255, 255, 0.6);
}
.name {
    display: flex;
    gap: 10px;
    align-items: center;
}
.user-name {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
}
.explain {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 6px;
}

/* 右侧账号信息卡片 */
.contont-right {
    flex: 1;
    background: #fff;
    border-radius: 10px;
    padding: 20px 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.info-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 16px;
    padding-left: 10px;
    border-left: 3px solid #409eff;
}
.logout-btn {
    margin-top: 20px;
    width: 100%;
}
</style>
