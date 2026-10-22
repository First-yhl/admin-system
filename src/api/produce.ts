import request from './request'
import type{ Produce } from '../types/produce'
import type {ApiRes} from '../types/api'
export const getProduceListApi = (params?:{seastate?:string,seacata?:string,seaname?:string}) => {
    return request<ApiRes<Produce[]>>('/produce',{params}) as unknown as Promise<ApiRes<Produce[]>>
}
export const updateProduceState = (id:number,state:string) =>{
    return request.put(`/produce/${id}/state`,{state})
}
export const deleteProduceApi = (id:number) =>{
    return request.delete(`/produce/${id}/select`)
}

export const addProduceApi = ({data}:{data:any}) =>{
    return request.post('/produce/post',data)
}
export const watchproduceApi = (id:number) =>{
    return request.get(`/produce/${id}`)
}