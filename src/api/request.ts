import axios from "axios"
import { ElMessage } from "element-plus"

const request = axios.create({
    baseURL:'/api',
    timeout:10000
})

//请求拦截器 自动带token 不然后面 每每触发一个接口相应都要带上header token
request. interceptors . request . use ( config => { const token = localStorage . getItem ( 'token' ) 
    if (token) {
    config. headers . Authorization = `Bearer ${token}` } 
    return config
})


request. interceptors . response . use ( res => { if (res. data . code !== 200 ) { 
    ElMessage.error (res. data . message ) 
    return Promise . reject (res. data )
  } return res. data })

  export default request