<template>
    <!-- 详情子路由出口：/produces/detail/:id 时渲染 watchproduce -->
    <router-view v-if="route.path.includes('detail')" />
    <!-- 商品列表主视图 -->
    <div class="produce" v-else>
         <div class="page-header">
            <h2 class="page-title">
                <span class="title-bar"></span>
                商品管理
            </h2>
            <p class="page-desc">管理平台商品信息，支持搜索、筛选、上下架等功能</p>
            <div class="function">
                <div class="function-l">
                    <el-input placeholder="请输入商品名"
                     @change="searchNow"
                    v-model="search.seaname"
                     class="search-input"
                    >    
                    </el-input>

                    <div class="status">
                        <span>商品状态</span>
                        <el-select  placeholder = "请商品状态" v-model="search.seastate"  @change="searchNow">
                        <el-option label="正常" value="active"></el-option>
                        <el-option label="禁用" value="disabled"></el-option>
                    </el-select>
                    </div>

                    <div class="role">
                        <span>商品类型</span>
                        <el-select  placeholder = "请选择类型" v-model="search.seacata"  @change="searchNow" >
                        <el-option v-for="item in produceStore.categoryList" :key="item" :label="item" :value="item">
                            {{item}}
                        </el-option>
                    </el-select>
                    </div>
                </div>
                <div class="function-r">
                    <el-button type='primary'>
                        <el-icon><Search /></el-icon>
                        搜索
                    </el-button>
                    <el-button @click="resetsea">
                        <el-icon><Refresh /></el-icon>
                        重置
                    </el-button>
                </div>  
        </div>
        </div>
        <div class="contont">
            <div class="add-btn">
                <el-button type='primary' @click="dialogVisible = true">
                    <el-icon><Plus /></el-icon>
                    新增商品
                </el-button>
                <el-button type='danger'>
                    <el-icon><Delete /></el-icon>
                    删除
                </el-button>
            </div>
            <div class="data-list">
                <el-table :data="pagedData" style="width:  100%">
                    <el-table-column type="selection" width="55"/>
                    <!-- 商品名称 + 描述 -->
                    <el-table-column prop="name" label="商品名称" min-width="240">
                        <template #default="{row}">
                            <div class="name-cell">
                                <div class="name">{{ row.name }}</div>
                                <div class="desc">{{ row.description }}</div>
                            </div>
                        </template>
                    </el-table-column>  
                    <!-- 分类 -->
                    <el-table-column prop="category" label="分类" width="110">
                        <template #default="{row}">
                            <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- 价格 -->
                    <el-table-column prop="price" label="价格(¥)" width="110" align="right">
                        <template #default="{row}">
                            <span class="price">¥{{ Number(row.price).toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <!-- 库存 -->
                    <el-table-column prop="stock" label="库存" width="90" align="center">
                        <template #default="{row}">
                            <el-tag :type="row.stock <= 50 ? 'danger': 'success'" size="small">
                                {{ row.stock }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <!-- 状态 -->
                    <el-table-column prop="state" label="状态" width="90" align="center">
                        <template #default="{row}">
                            <el-tag :type="row.state === 'active' ? 'success' : 'info'" size="small">
                                {{ row.state === 'active' ? '正常' : '已下架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <!-- 上架状态开关 -->
                    <el-table-column label="上架状态" width="110" align="center">
                        <template #default="{ row }">
                            <el-switch
                                :model-value="row.state"
                                @change="(val) => produceStore.updateProduce(row.id, val as string)"
                                active-value="active"
                                inactive-value="disabled"
                            />
                        </template>
                    </el-table-column>
                    <!-- 创建时间 -->
                    <el-table-column prop="createdAt" label="创建时间" width="170" />
                    <!-- 操作 -->
                    <el-table-column label="操作" width="180" fixed="right">
                        <template #default="{row}">
                            <div class="action-btns">
                                <el-button size="small" type="primary" link @click="goDetail(row)">查看</el-button>
                                <el-button size="small" type="primary" link>编辑</el-button>
                                <el-button size="small" type="danger" link @click="produceStore.deleteProduce(row.id)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="pagination"
                    :total="filteredData.length"
                    :page-sizes="[5, 10]"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                />

                <el-dialog
                    v-model="dialogVisible"
                    title="新增商品"
                    width="560px"
                    draggable
                    class="produce-dialog"
                >   
                    <el-form label-width="80px" :model="form" :rules="rules">
                        <el-form-item label="商品名称" prop="name">
                            <el-input placeholder="请输入商品名称" v-model="form.name" />
                        </el-form-item>
                        <el-form-item label="分类" prop="category">
                            <el-select placeholder="请选择分类" v-model="form.category" class="w-full">
                                <el-option v-for="c in produceStore.categoryList" :key="c" :label="c" :value="c">{{c}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格(¥)" prop="price">
                            <el-input v-model="form.price" :min="0" :precision="2" controls-position="right" class="w-full" />
                        </el-form-item>
                        <el-form-item label="库存" prop="stock">
                            <el-input v-model="form.stock" :min="0" :step="10" controls-position="right" class="w-full" />
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input type="textarea" :rows="3" placeholder="请输入商品描述" v-model="form.description" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="cancelAdd">取消</el-button>
                            <el-button type="primary" @click="handleSubmit">提交</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import {Plus, Delete, Search, Refresh} from '@element-plus/icons-vue'
import { computed, onMounted, reactive } from 'vue';
import { useProduceStore } from '../stores/produce'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const produceStore = useProduceStore()
onMounted(()=>{
    produceStore.fetchProduceList()
})
const search = reactive({
    seaname:'',
    seacata:'',
    seastate: '',
})
const dialogVisible = ref(false)
const rules = {
    name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    category: [{ required: true, message: '请选择分类', trigger: 'change' }],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    stock: [{ required: true, message: '请输入库存', trigger: 'blur' }],
    description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
}

// 新增商品表单数据（UI 用，提交逻辑你自己接）
const form = reactive({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
})
const cancelAdd = ()=>{
    form.name = ''
    form.category = ''
    form.price = ''
    form.stock = ''
    form.description = ''
    dialogVisible.value = false
}
//动态类别筛选
// const catalist = computed(()=>{
//     return [...new Set(produceStore.produceList.map(item=>item.category))]
// })
const goDetail = (row:any)=>{
    router.push(`/layout/produces/detail/${row.id}`)
} 

const resetsea = ()=>{
    search.seaname = '',
    search.seastate = '',
    search.seacata = ''
    produceStore.fetchProduceList()  
}

// 提交占位：功能你自己实现
const handleSubmit = async () => {
    await produceStore.addProduce({data:form})
    produceStore.fetchProduceList()
    form.name = ''
    form.category = ''
    form.price = ''
    form.stock = ''
    form.description = ''
    dialogVisible.value = false
}

// ========== 分页（模仿用户页面） ==========
const pageSize = ref(5)
const currentPage = ref(1)

// 筛选后的全量数据（筛选逻辑你自己接，先透传全部）
const filteredData = computed(() => {
    return produceStore.produceList
})

// 从筛选结果里切当前页
const pagedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredData.value.slice(start, start + pageSize.value)
})

const searchNow = ()=>{
    router.replace({path:route.path,
        query:{
            seaname:search.seaname || undefined,
            seacata:search.seacata || undefined,
            seastate:search.seastate || undefined
        }})
    produceStore.fetchProduceList(search)    
}
const handleSizeChange = () => {
    currentPage.value = 1
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
.contont{
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
.name-cell {
    display: flex;
    flex-direction: column;
}
.name {
    font-weight: 600;
    color: #303133;
    white-space: normal;
    word-break: break-all;
}
.desc {
    color: #909399;
    font-size: 13px;
    margin-top: 4px;
    white-space: normal;
    line-height: 1.4;
}
/* 价格 */
.price {
    font-weight: 600;
    color: #f56c6c;
}
/* 分页 */
.pagination {
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
:deep(.produce-dialog .el-dialog__header) {
    margin-right: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}
:deep(.produce-dialog .el-dialog__footer) {
    padding-top: 15px;
    border-top: 1px solid #ebeef5;
}
</style>