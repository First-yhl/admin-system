<template>
   <div v-if="$route.params.id">
        <RouterView />
   </div>
   <div v-else>
         <div class="user">
        <div class="page-header">
            <h2 class="page-title">
                <span class="title-bar"></span>
                用户管理
            </h2>
            <p class="page-desc">管理系统用户信息，支持搜索、修改、增删改查等功能</p>
        </div>
        <div class="function">
                <div class="function-l">
                    <el-input placeholder="请输入用户名或者手机号"
                     v-model="keyword"
                     :prefix-icon="Search"
                     class="search-input"
                    >    
                    </el-input>

                    <div class="status">
                        <span>用户状态</span>
                        <el-select v-model="status" placeholder = "请选择状态">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="正常" value="active"></el-option>
                        <el-option label="禁用" value="disabled"></el-option>
                    </el-select>
                    </div>

                    <div class="role">
                        <span>用户角色</span>
                        <el-select v-model="role" placeholder = "请选择角色">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="vip用户" value="vip"></el-option>
                        <el-option label="普通用户" value="common"></el-option>
                    </el-select>
                    </div>
                </div>
                <div class="function-r">
                    <el-button type='primary'>
                        <el-icon><Search /></el-icon>
                        搜索
                    </el-button>
                    <el-button @click="resetSearch">
                        <el-icon><Refresh /></el-icon>
                        重置
                    </el-button>
                </div>
                
        </div>
        <div class="content">
            <div class="add-btn">
                <el-button type='primary' @click="dialog = true">
                    <el-icon><Plus /></el-icon>
                    新增用户
                </el-button>
            </div>
            <div class="user-list">
                <el-table :data="pagedData" style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="id" label="用户ID" width="80" />
                    <el-table-column prop="username" label="用户名" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="phone" label="手机号" width="130" />
                    <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="status" label="用户状态" width="100">
                        <template #default="{row}">
                            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
                                {{ row.status === 'active' ? '正常' : '禁用' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="role" label="用户角色" width="100">
                        <template #default="{row}">
                            <el-tag :type="row.role === 'vip' ? 'warning' : 'primary'">
                                {{ row.role === 'vip' ? 'vip用户' : '普通用户' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间" width="180" />
                    <el-table-column label="操作" width="200">
                    <template #default="currentRow">
                        <div class="action-btns">
                            <el-button size="small" type="primary">编辑</el-button>
                            <el-button size="small" type="info" @click="handleUserClick(currentRow.row)">详情</el-button>
                            <el-button type="danger" size="small" @click = "userStore.handleDelete(currentRow.row.id)">删除</el-button>
                        </div>
                    </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="pagination"
                    :total="filteredData.length"
                    :page-sizes="[5,10]"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                />
                <el-dialog
                    title="新增用户"
                    width="560px"
                    draggable
                    v-model="dialog"
                    class="user-dialog"
                    @close="handleDialogClose"
                >
                    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" size="large">
                        <el-form-item label="用户名" prop="username">
                            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="form.username" />
                        </el-form-item>
                        <el-form-item label="外号" prop="nickname">
                            <el-input placeholder="请输入外号" :prefix-icon="User" v-model="form.nickname" />
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input placeholder="请输入手机号" :prefix-icon="Phone" v-model="form.phone" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input placeholder="请输入邮箱" :prefix-icon="Message" v-model="form.email">
                                <template #append>
                                    <el-select v-model="emailDomain">
                                        <el-option label="@qq.com" value="@qq.com" />
                                        <el-option label="@gmail.com" value="@gmail.com" />
                                    </el-select>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="role">
                            <el-select v-model="form.role" placeholder="请选择角色" class="w-full">
                                <el-option label="普通用户" value="common" />
                                <el-option label="VIP用户" value="vip" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="handleDialogClose">取消</el-button>
                            <el-button type="primary" @click="handleSubmit">提交</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
   </div>
</template>

<script lang='ts' setup>
import { Search, Refresh,Plus,User, Phone, Message } from '@element-plus/icons-vue';
import {useUserStore} from '../stores/user'
import {ref, onMounted, computed, reactive, watch} from 'vue'
import type { FormInstance } from "element-plus"
import {router} from '../router'
import {useRoute} from 'vue-router'
const route = useRoute()
const formRef = ref<FormInstance>()
const emailDomain = ref("qq.com")
const form = reactive({
    username:'',
    nickname: '',
    phone: '',
    email: '',
    role: ''
})
const userStore = useUserStore()
const keyword = ref("")
const status = ref("all")
const role = ref("all")
const pageSize = ref(5)
const currentPage = ref(1)
const dialog = ref(false)


onMounted(()=>{
    userStore.fetchUsers()
})

// 筛选：从全量里按条件过滤（实时响应，不用手动调）
//***重点 */

// const filteredData = computed(()=>{
//     return userStore.users.filter(u => {
//         // 状态筛选
//         if (status.value !== 'all' && u.status !== status.value) return false
//         // 角色筛选
//         if (role.value !== 'all' && u.role !== role.value) return false
//         // 关键词筛选：匹配用户名或手机号
//         if (keyword.value) {
//             const kw = keyword.value.toLowerCase()
//             if (!u.username.toLowerCase().includes(kw) && !u.phone.includes(kw)) return false
//         }
//         return true
//     })
// })

const filteredData = computed(()=>{
    const kw = keyword.value.toLowerCase()
    return userStore.users.filter(u =>{
        return ((status.value === 'all' || u.status === status.value)&&
        (role.value === 'all' || u.role === role.value) &&
        (!keyword.value || u.username.toLowerCase().includes(kw) || u.phone.includes(kw))      
    )
    })
})




// 筛选条件变了 → 回第一页
watch([keyword, status, role], () => {
    currentPage.value = 1
})

// 分页：从筛选结果里切片
const pagedData = computed(()=>{
    const start = (currentPage.value-1)*pageSize.value
    return filteredData.value.slice(start, start + pageSize.value)
})

const handleSizeChange = () => {
  currentPage.value = 1
}

// 重置筛选
const resetSearch = () => {
    keyword.value = ""
    status.value = "all"    
    role.value = "all"
    currentPage.value = 1
}

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_]{3,12}$/, message: '3-12位字母、数字或下划线', trigger: 'blur' }
    ],
    nickname: [
        { min: 2, max: 10, message: '2-10位字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择用户角色', trigger: 'change' }
    ]
}

const handleSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            userStore.AddUser({
                ...form,
                email: form.email + emailDomain.value
            })
            dialog.value = false
        }
    })
}

const handleDialogClose = () => {
    formRef.value?.resetFields()
    dialog.value = false
}

const handleUserClick = (user:any) => {
    router.push({
        path:'/layout/user/watchuser/'+user.id,
})
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

/* 筛选区卡片 */
.function {
    padding: 15px 25px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

/* 左侧筛选控件组 */
.function-l {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* 右侧按钮组 */
.function-r {
    display: flex;
    gap: 12px;
}

/* 标签 + 控件 组合 */
.status,
.role {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 标签文字 */
.status > span,
.role > span {
    font-size: 14px;
    color: #606266;
    white-space: nowrap;
}

/* 搜索框宽度 */
.search-input {
    width: 240px;
}

/* 下拉框统一宽度 */
:deep(.el-select) {
    width: 160px;
}

.content{
    padding: 15px 25px;
    background-color: #fff;
    border-radius: 8px;
}
.add-btn{
    margin-bottom: 20px;
}
.action-btns {
    display: flex;
    gap: 6px;
}
.pagination{
    margin-top: 20px;
}
.w-full {
    width: 100%;
}
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
:deep(.user-dialog .el-dialog__header) {
    margin-right: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}
:deep(.user-dialog .el-dialog__body) {
    padding-top: 20px;
    padding-bottom: 10px;
}
:deep(.user-dialog .el-dialog__footer) {
    padding-top: 15px;
    border-top: 1px solid #ebeef5;
}
</style>
