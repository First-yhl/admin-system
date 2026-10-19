<template>
    <div class="login">
        <div class="content">
            <div class="content-l">
                <div class="title">
                    <h2>电商平台后台管理系统</h2>
                    <p class="brand-subtitle">高效 · 便捷 · 安全</p>
                </div>
                <div class="illustration-box">
                    <img :src="illustration" alt="" class="illustration">
                </div>
                    <div class="foorer-item">
                        <div class="feature-item">
                            <el-icon :size="30" color="#3b82f6"><Goods /></el-icon>
                            <span>商品管理</span>
                        </div>
                        <div class="feature-item">
                            <el-icon :size="30" color="#3b82f6"><List /></el-icon>
                            <span>订单管理</span>
                        </div>
                        <div class="feature-item">
                            <el-icon :size="30" color="#3b82f6"><DataLine /></el-icon>
                            <span>数据分析</span>
                        </div>
                        <div class="feature-item">
                            <el-icon :size="30" color="#3b82f6"><Key /></el-icon>
                            <span>权限控制</span>
                        </div>  
                    </div>
            </div>
            <div class="content-r">
                <div class="card">
                    <div class="logo">
                        <el-icon>
                            <el-icon :size="34" color="#3b82f6"><Shop /></el-icon>
                        </el-icon>
                    </div>
                    <h3>电商平台后台管理系统</h3>
                    <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleLogin">
                        <el-form-item prop="username">
                            <el-input
                                placeholder="请输入用户名"
                                v-model="form.username"
                                :prefix-icon="User"
                                class="login-input"
                                size='large'
                            />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                placeholder="请输入密码"
                                v-model="form.password"
                                type='password'
                                show-password
                                :prefix-icon="Lock"
                                class="login-input"
                                size='large'
                            />
                        </el-form-item>
                        <div class="select">
                            <el-checkbox v-model="remember">
                                记住账号
                            </el-checkbox>
                            <span class="forget-pwd">忘记密码?</span>
                        </div>

                        <el-button type="primary" class="login-btn" @click="handleLogin">
                            登 录
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import illustration from "../assets/illustration.svg"
import {Goods, List, DataLine, Key,Shop,User, Lock} from "@element-plus/icons-vue"
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

import { ElMessage } from "element-plus"
import type { FormInstance } from "element-plus"

import { useRouter } from "vue-router"
import { useLoginStore } from "../stores/login"

const router = useRouter()
const loginStore = useLoginStore()
const remember = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
    username: '',
    password: ''
})
//****** 表单校验 *****重点*/
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度为 3-20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
    ]
}

const handleLogin = async () => {
    if (!formRef.value) return
    try {
        await formRef.value.validate()
        const res = await loginStore.login({ username: form.username, password: form.password })
        const redirect = route.query.redirect as string
        ElMessage.success('登录成功')
        router.push(redirect || '/layout/dashboard')
    } catch (err) {
        // 校验失败不提示，接口失败拦截器已处理
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #bfdbfe 0%, #dbeafe 50%, #eff6ff 100%);
}
.content{
    display: flex;
    height: 100%;
}
.content-l{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 60px 50px;
}
.content .content-l .title{
    text-align: center;
    width: 100%;
}
.content .content-l .illustration-box{   /*这是重点*/
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
h2{
      font-size: 36px;
  font-weight: bold;
  margin: 0;
  color: #1e3a8a;
}
.brand-subtitle {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 16px;
}

.content .content-l .illustration{
    max-width: 700px;
    width: 100%;
    height: auto;

}
.foorer-item{
    display: flex;
    justify-content: space-around;
      padding-top: 24px;
}
.feature-item{
    display: flex;
    flex-direction: column;
    align-items: center;    
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
}
.content-r{       /*这是重点*/
    flex: 0 0 480px;
    padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}



:deep(.el-form-item__error) { color : #ef4444 ; /* 改颜色 */ font-size : 12px ; padding-top : 2px ;
}



.card{     /*这是重点*/
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
  padding: 40px;
}
.logo{
 width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
h3{
      text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 30px;
  color: #1f2937;
}
.select{
    display: flex;
    justify-content: space-between;
    align-items: center;
     margin-bottom: 24px;
}
.forget-pwd {
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
}
.login-btn{
      width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .content-r {
    flex: 0 0 420px;
  }
  .illustration {
    max-width: 500px;
  }
  h2 {
    font-size: 28px;
  }
}
@media (max-width: 768px) {
  .content-l {
    display: none;
  }
  .content-r {  
    flex: 1;
    padding: 16px;
  }
  .card {
    padding: 30px 24px;
  }
}
</style>