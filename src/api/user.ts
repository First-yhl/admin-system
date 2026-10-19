import request from "./request";
import type {ApiRes} from '../types/api'
import type {User} from '../types/user'
export const getUser = ()=>{
    return request.get<ApiRes<User[]>>('/user') as unknown as Promise<ApiRes<User[]>>
}