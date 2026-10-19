import { defineStore } from 'pinia'
import { loginapi } from '../api/login'
import { ref } from 'vue'

export const useLoginStore = defineStore('login',()=>{
    const token = ref(localStorage.getItem('token') || '')
    const name = ref(localStorage.getItem('name') || '')
    const role = ref(localStorage.getItem('role') || '')


    const login = async(data:{username:string,password:string})=>{
        const res = await loginapi(data)
        token.value = res.data.token
        role.value = res.data.role
        name.value = res.data.name
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('name',res.data.name)
        localStorage.setItem('role',res.data.role)
        return res
    }

    const out = ()=>{
        localStorage.removeItem('name')
        localStorage.removeItem('role')
        token.value = ''
        role.value = ''
        name.value = ''
        localStorage.removeItem('token')

    }
    return {token,login,out,name,role}
})