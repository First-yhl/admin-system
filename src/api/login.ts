import request from '../api/request'

export const loginapi = (data:{username:string,password:string})=>{
    return request.post('/login',data)
}
