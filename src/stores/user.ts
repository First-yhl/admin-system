import { defineStore } from 'pinia'
import type {User} from '../types/user'
import { getUser } from '../api/user'
import { computed, ref } from 'vue'
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

    const handleDelete = (id:number)=>{
        users.value = users.value.filter(u => u.id !== id)
        saveToStorage()
    }

    return {users,fetchUsers,totalUsers,AddUser,handleDelete}
})
