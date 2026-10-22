<template>
    <div class="user-detail" v-if="user">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
            <el-button @click="goBack">
                <el-icon><ArrowLeft /></el-icon>
                返回
            </el-button>
            <span class="toolbar-title">用户详情</span>
        </div>

        <!-- 用户基本信息 -->
        <div class="profile-card">
            <div class="avatar">
                <el-avatar :size="80" :style="{ backgroundColor: avatarColor }">
                    {{ user.username.charAt(0).toUpperCase() }}
                </el-avatar>
            </div>
            <div class="profile-info">
                <div class="profile-name">
                    {{ user.username }}
                    <el-tag :type="user.status === 'active' ? 'success' : 'danger'" effect="dark" class="status-tag">
                        {{ user.status === 'active' ? '正常' : '禁用' }}
                    </el-tag>
                </div>
                <div class="profile-nickname">外号：{{ user.nickname }}</div>
            </div>
        </div>

        <!-- 详细信息 -->
        <div class="info-card">
            <div class="card-title">详细信息</div>
            <el-descriptions :column="2" border>
                <el-descriptions-item label="用户ID">{{ user.id }}</el-descriptions-item>
                <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
                <el-descriptions-item label="外号">{{ user.nickname || '-' }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{ user.phone }}</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
                <el-descriptions-item label="用户角色">
                    <el-tag :type="roleTagType" size="small">
                        {{ roleText }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="创建时间" :span="2">{{ user.createdAt }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>

    <!-- 用户不存在 -->
    <div class="not-found" v-else>
        <el-empty description="该用户不存在或已被删除">
            <el-button type="primary" @click="goBack">返回列表</el-button>
        </el-empty>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 响应式根据路由参数找用户
const user = computed(() => {
    const id = Number(route.params.id)
    return userStore.users.find(u => u.id === id)
})

// 角色显示文本
const roleText = computed(() => {
    const map: Record<string, string> = { common: '普通用户', vip: 'VIP用户', diamond: '黑钻用户' }
    return map[user.value?.role || ''] || '-'
})

// 角色标签颜色
const roleTagType = computed<'primary' | 'warning' | 'danger' | 'info'>(() => {
    const map: Record<string, 'primary' | 'warning' | 'danger' | 'info'> = {
        common: 'primary', vip: 'warning', diamond: 'danger'
    }
    return map[user.value?.role || ''] || 'info'
})

// 头像背景色（根据用户名生成固定颜色）

//运用哈希
const avatarColor = computed(() => {
    const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#8e44ad', '#16a085']
    const name = user.value?.username || ''
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
})

const goBack = () => {
    router.push('/layout/user')
}
</script>

<style scoped>
.user-detail {
    padding: 0;
}
.toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}
.toolbar-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

/* 头像卡片 */
.profile-card {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px 30px;
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border-radius: 10px;
    margin-bottom: 20px;
}
.profile-info {
    color: #fff;
}
.profile-name {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
}
.status-tag {
    border: none;
}
.profile-nickname {
    font-size: 14px;
    opacity: 0.85;
    margin-top: 4px;
}

/* 信息卡片 */
.info-card {
    background: #fff;
    border-radius: 10px;
    padding: 20px 24px;
}
.card-title {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 16px;
    padding-left: 10px;
    border-left: 3px solid #409eff;
}

/* 未找到 */
.not-found {
    padding: 80px 0;
    display: flex;
    justify-content: center;
}
</style>
