import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAppStore = defineStore('app', ()=>{
    const isCollapse = ref(false)
     const isMobileOpen = ref(false)
    return {isCollapse, isMobileOpen}
})
export { useAppStore }
