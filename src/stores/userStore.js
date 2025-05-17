import {defineStore} from 'pinia'
import {loginAPI} from '@/apis/user'
import {useCartStore} from './cartStore'
import {ref} from 'vue'

export const useUserStore = defineStore('user',() => {
    const cartStore = useCartStore()
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }
    // 退出登录时清空用户数据
    const clearUser = () => {
        userInfo.value = {}
        // 清空购物车列表action
        cartStore.clearCart()
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