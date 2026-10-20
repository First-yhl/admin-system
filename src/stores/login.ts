import { defineStore } from 'pinia'
import { loginapi } from '../api/login'
import { ref } from 'vue'

export const useLoginStore = defineStore('login',()=>{
    const token = ref(localStorage.getItem('token') || '')
    const username = ref(localStorage.getItem('username') || '')
    const name = ref(localStorage.getItem('name') || '')
    const role = ref(localStorage.getItem('role') || '')
    const phone = ref(localStorage.getItem('phone') || '')
    const email = ref(localStorage.getItem('email') || '')
    const logintime = ref(localStorage.getItem('logintime') || '')


    const login = async(data:{username:string,password:string})=>{
        const res = await loginapi(data)
        token.value = res.data.token
        username.value = res.data.username
        role.value = res.data.role
        name.value = res.data.name
        phone.value = res.data.phone
        email.value = res.data.email
        logintime.value = res.data.logintime
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('username',res.data.username)
        localStorage.setItem('name',res.data.name)
        localStorage.setItem('role',res.data.role)
        localStorage.setItem('phone',res.data.phone)
        localStorage.setItem('email',res.data.email)
        localStorage.setItem('logintime',res.data.logintime)
        return res
    }

    const out = ()=>{
        localStorage.removeItem('username')
        localStorage.removeItem('name')
        localStorage.removeItem('role')
        localStorage.removeItem('phone')
        localStorage.removeItem('email')
        localStorage.removeItem('logintime')
        token.value = ''
        username.value = ''
        role.value = ''
        name.value = ''
        phone.value = ''
        email.value = ''
        logintime.value = ''
        localStorage.removeItem('token')
        
    }
    return {token,login,out,username,name,role,phone,email,logintime}
})