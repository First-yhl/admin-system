<template>
    <div class="layout">
        <Sidebar />
        <div class="content">
            <Narbar />
            <div class="main">
                <div class="breadcrub">
                    <Breadcrub />
                </div>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import Sidebar from '../components/sidebar.vue'
import Narbar from '../components/narbar.vue'
import Breadcrub from '../components/breadcrub.vue'
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
.content {
        flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f5f5f5;
}
.breadcrub {
    margin-bottom: 20px;
}
</style>