import {defineStore} from 'pinia'
import {loginAPI} from '@/apis/user'
import {ref} from 'vue'

export const useUserStore = defineStore('user',() => {
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }
    // 定义清空用户数据的函数
    const clearUser = () => {
        userInfo.value = {}
    }
    // 3. 以对象的形式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUser
    }
},{
    persist:true
})