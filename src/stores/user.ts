import { defineStore } from 'pinia'
import type {User} from '../types/user'
import { getUser } from '../api/user'
import { computed, ref } from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
export const useUserStore = defineStore('user',()=>{
    const STORAGE_KEY = 'user-list'

    const users = ref<User[]>([])

    const fetchUsers = async()=>{
        // 1. 先看 localStorage 有没有缓存
        const cached = localStorage.getItem(STORAGE_KEY)
        if (cached) {
            users.value = JSON.parse(cached)
            return
        }
        // 2. 没有才调 mock
        const res = await getUser()
        users.value = res.data
        // 3. 存入 localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value))
    }

    const saveToStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value))
    }

    const totalUsers = computed(()=>users.value.length)

    const formatDate = (d: Date) => {
        let y = d.getFullYear()
        let m = d.getMonth() + 1
        let day = d.getDate()
        let h = d.getHours()
        let min = d.getMinutes()
        let s = d.getSeconds()
        const pad = (n: number) => n < 10 ? '0' + n : '' + n
        return `${y}-${pad(m)}-${pad(day)} ${pad(h)}:${pad(min)}:${pad(s)}`
    }

    const AddUser = (user:{username:string,nickname:string,phone:string,email:string,role:any})=>{
        users.value.push({
            id: users.value.length + 1,
            username: user.username,
            nickname: user.nickname,
            phone: user.phone,
            email: user.email,
            status: 'active',
            role: user.role,
            createdAt: formatDate(new Date())
        })
        saveToStorage()
    }
    function openConfirm (){
        return ElMessageBox.confirm('确认删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
    }
   const handleDelete = async (id:number) => {
    try {
        await openConfirm()   // ← 卡在这里等用户点
        // 用户点了"确定" → 走到这里 → 才删
        users.value = users.value.filter(u => u.id !== id)
        saveToStorage()
    } catch {
        // 用户点了"取消"或点了关闭 → reject → 到这里 → 啥也不做
    }
}

    const modpeople = ref(false)
    const onpeople = ref<User | undefined>()
    const mod = (id:number)=>{
        const user = users.value.find(u => u.id === id)
        onpeople.value = user
        modpeople.value = true
    }
    const closeMod = () => {
        modpeople.value = false
        onpeople.value = undefined
    }

    const UpdateUser = (id:number, data:{username:string,nickname:string,phone:string,email:string,role:any}) => {
        const idx = users.value.findIndex(u => u.id === id)
        if (idx !== -1) {
            users.value[idx] = { ...users.value[idx], ...data }
            modpeople.value = false
            saveToStorage()
        }
    }

    const selectedIds = ref<number[]>([])   // 存勾选的 id

// @selection-change 回调：EP 传勾选行数组
const select = (rows: any[]) => {
    selectedIds.value = rows.map(r => r.id)   // 提取 id 数组
}

const batchDelete = async () => {
    if (selectedIds.value.length === 0) {
        ElMessage.warning('请先勾选要删除的用户')
        return
    }
    try {
        await openConfirm()   // 复用确认框
        users.value = users.value.filter(u => !selectedIds.value.includes(u.id))
        saveToStorage()
        ElMessage.success('删除成功')
    } catch {}
}
    return {users,fetchUsers,totalUsers,AddUser,handleDelete,modpeople,mod,onpeople,closeMod,UpdateUser,select,batchDelete}
})
