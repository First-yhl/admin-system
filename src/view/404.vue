<template>
    <div class="not-found-page">
        <!-- 装饰浮动小球 -->
        <div class="float-ball b1"></div>
        <div class="float-ball b2"></div>
        <div class="float-ball b3"></div>

        <div class="code">4<span class="zero">0</span>4</div>
        <h2 class="title">页面走丢了</h2>
        <p class="desc">你访问的页面不存在，或已被移动、删除</p>
        <div class="actions">
            <el-button type="primary" size="large" @click="goHome">
                <el-icon><HomeFilled /></el-icon>
                返回首页
            </el-button>
            <el-button size="large" @click="goBack">
                <el-icon><Back /></el-icon>
                返回上一页
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { HomeFilled, Back } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
    router.push('/layout/dashboard')
}

const goBack = () => {
    // 有历史记录就返回，没有就回首页
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push('/layout/dashboard')
    }
}
</script>

<style scoped>
.not-found-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8edf5 100%);
    position: relative;
    overflow: hidden;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 404 大数字：文字渐变 */
.code {
    font-size: 160px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 8px;
    background: linear-gradient(135deg, #409eff 0%, #79bbff 50%, #8e44ad 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    user-select: none;
}

/* 中间的 0：加个旋转动画显得不那么呆板
   ⚠️ 必须自己带背景渐变：
   transform 会让 .zero 形成独立图层，父 .code 的
   background-clip:text 背景裁剪不到它，所以颜色要自己给 */
.zero {
    display: inline-block;
    background: linear-gradient(135deg, #409eff 0%, #79bbff 50%, #8e44ad 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: spin 8s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.title {
    font-size: 28px;
    font-weight: 600;
    color: #303133;
    margin: 24px 0 8px;
}

.desc {
    font-size: 15px;
    color: #909399;
    margin: 0 0 36px;
}

.actions {
    display: flex;
    gap: 16px;
}

/* 装饰浮动小球 */
.float-ball {
    position: absolute;
    border-radius: 50%;
    opacity: 0.15;
    animation: float 6s ease-in-out infinite;
}

.b1 {
    width: 160px;
    height: 160px;
    background: #409eff;
    top: 15%;
    left: 12%;
}

.b2 {
    width: 90px;
    height: 90px;
    background: #67c23a;
    bottom: 20%;
    right: 15%;
    animation-delay: 2s;
}

.b3 {
    width: 56px;
    height: 56px;
    background: #e6a23c;
    top: 25%;
    right: 22%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-24px); }
}
</style>
