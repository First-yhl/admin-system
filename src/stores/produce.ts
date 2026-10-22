import { defineStore } from 'pinia'
import type { Produce } from '../types/produce'
import { ref } from 'vue'
import { getProduceListApi,updateProduceState,deleteProduceApi,addProduceApi,watchproduceApi } from '../api/produce'
    
export const useProduceStore = defineStore('produce',()=>{
    const produceList = ref<Produce[]>([])
    const categoryList = ref<string[]>([])
   const fetchProduceList = async (params?: { seastate?: string, seacata?: string, seaname?: string }) => {
    const res = await getProduceListApi(params)
    produceList.value = res.data

    // 有筛选条件（任一值非空）→ 列表是过滤结果，分类选项不动
    // 无筛选条件（全量）→ 顺便更新分类选项
    const hasFilter = params && Object.values(params).some(v => v)   // 不索引，不报错
    if (!hasFilter) {
        categoryList.value = [...new Set(res.data.map(i => i.category))]
    }
    return res
}

    const addProduce = async({data}:{data:any})=>{
        const res = await addProduceApi({data})
        produceList.value.unshift(res.data)

    }

    const updateProduce = async (id:number,state:string) =>{
        await updateProduceState(id,state)
        const p = produceList.value.find(i => i.id === id)  
        if (p) p.state = state
    }


    const deleteProduce = async (id:number) =>{
        await deleteProduceApi(id)
        const p = produceList.value.find(i => i.id === id)  
        if (p) produceList.value.splice(produceList.value.indexOf(p),1)
    }

    const detail = ref<Produce | null>(null)
const getProduceDetail = async (id: number) => {
    const res = await watchproduceApi(id)
    detail.value = res.data
    return res
}
    return {
        produceList,
        categoryList,
        fetchProduceList,
        updateProduce,
        deleteProduce,
        addProduce,
        getProduceDetail,
        detail
    }
})