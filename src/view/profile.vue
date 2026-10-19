<template>
    <el-button type='danger' @click="getOut">
        退出登录
    </el-button>
</template>

<script lang='ts' setup>
import { getOutputFileNames } from 'typescript';
import {useLoginStore} from '../stores/login'
import {useRouter} from 'vue-router'

const router = useRouter()

const loginStore = useLoginStore()

const getOut = ()=>{
    loginStore.out()
    router.push('/')
}
</script>

<style scoped>
</style>