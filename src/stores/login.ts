import { defineStore } from 'pinia'
import { loginapi } from '../api/login'
import { ref } from 'vue'

export const useLoginStore = defineStore('login',()=>{
    const token = ref(localStorage.getItem('token') || '')
    const login = async(data:{username:string,password:string})=>{
        const res = await loginapi(data)
        token.value = res.data.token
        localStorage.setItem('token',res.data.token)
        return res
    }
    return {token,login}
})