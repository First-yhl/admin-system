<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(value, index) in breadcrumb" :key="value.path"
        :to = "index > 0 ? value.path : undefined"
        >
            {{value.meta.title}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
.breadcrumb {
    font-size: 14px;
}
:deep(.el-breadcrumb__inner) {
    color: #909399;
    font-size: 14px;
}
:deep(.el-breadcrumb__inner.is-link:hover) {
    color: #409eff;
}
:deep(.el-breadcrumb__separator) {
    color: #c0c4cc;
    margin: 0 8px;
}
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: #303133;
    font-weight: 500;
}
</style>
<!-- 当你访问/layout/dashboard的时候，router会把从跟路由到当前路由的所有匹配项组成一个数组就是route.matched
route.matched = [
    { 
        path: '/layout', 
        meta: { requiredAuth: true, title: '首页' } 
    },
    { 
        path: '/layout/dashboard', 
        meta: { requiredAuth: true, title: '仪表盘' } 
    }
] -->


<script lang='ts' setup>
import {useRoute} from 'vue-router'
const route = useRoute()
import {computed} from 'vue'
const breadcrumb = computed(()=>{
    return route.matched.filter(item => item.meta && item.meta.title)
})
</script>
