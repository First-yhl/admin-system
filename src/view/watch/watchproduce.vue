<template>
    <div class="produce-detail" v-if="produceStore.detail">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
            <el-button @click="goBack">
                <el-icon><ArrowLeft /></el-icon>
                返回
            </el-button>
            <span class="toolbar-title">商品详情</span>
        </div>

        <!-- 商品信息卡片 -->
        <div class="profile-card">
            <div class="profile-info">
                <div class="profile-name">
                    {{ produceStore.detail.name }}
                    <el-tag :type="produceStore.detail.state === 'active' ? 'success' : 'info'" effect="dark" class="status-tag">
                        {{ produceStore.detail.state === 'active' ? '正常' : '已下架' }}
                    </el-tag>
                </div>
                <div class="profile-category">分类：{{ produceStore.detail.category }}</div>
            </div>
        </div>

        <!-- 详细信息 -->
        <div class="info-card">
            <div class="card-title">详细信息</div>
            <el-descriptions :column="2" border>
                <el-descriptions-item label="商品ID">{{ produceStore.detail.id }}</el-descriptions-item>
                <el-descriptions-item label="商品名称">{{ produceStore.detail.name }}</el-descriptions-item>
                <el-descriptions-item label="分类">{{ produceStore.detail.category }}</el-descriptions-item>
                <el-descriptions-item label="价格">¥{{ Number(produceStore.detail.price).toFixed(2) }}</el-descriptions-item>
                <el-descriptions-item label="库存">{{ produceStore.detail.stock }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{ produceStore.detail.createdAt }}</el-descriptions-item>
                <el-descriptions-item label="商品描述" :span="2">{{ produceStore.detail.description }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>

    <!-- 商品不存在 -->
    <div class="not-found" v-else>
        <el-empty description="该商品不存在或已被删除">
            <el-button type="primary" @click="goBack">返回列表</el-button>
        </el-empty>
    </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useProduceStore } from '../../stores/produce'

const route = useRoute()
const router = useRouter()
const produceStore = useProduceStore()

// 进页面就按路由里的 id 拉取详情
onMounted(async () => {
    const id = Number(route.params.id)
    await produceStore.getProduceDetail(id)
})

const goBack = () => {
    router.push('/layout/produces')
}
</script>

<style scoped>
.produce-detail {
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

/* 商品信息卡片 */
.profile-card {
    display: flex;
    align-items: center;
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
.profile-category {
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
