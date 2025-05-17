import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useUserStore} from '@/stores/userStore'
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart',() => {
    const userStore = useUserStore()
    // 拿到token 判断是否登录
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList = ref([])


    // 2. 定义action - 添加购物车
    const addCart = async (goods) => {
        const {skuId,count} = goods
        if(isLogin.value){
            // 登录调用接口
            // 1. 调用添加购物车接口
            await insertCartAPI({skuId,count})
            updateCart()
        }else{
            // 未登录时操作本地
            // 添加购物车操作
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        // 已添加过 count++
        if(item){
            item.count++
        }else{
        //  没有添加过 push
        cartList.value.push(goods)
        }
        }
        

    }
    // 删除商品信息
    const deleteCart = async (skuId) => {
        if(isLogin.value){
            // 登录时
            await delCartAPI([skuId])
            updateCart()
            
        }else{
            const idx = cartList.value.findIndex((item) => item.skuId === skuId)
            cartList.value.splice(idx,1)
        }
        
    }

    // 获取购物车列表
    const updateCart = async () => {
        // 1. 调用获取购物车接口
        const res = await findNewCartListAPI()
        // 2. 用接口购物车列表覆盖本地购物车列表
        cartList.value = res.result
    }

    // 清除购物车列表
    const clearCart = () => {
        cartList.value = []
    }

    // 单选框值的改变
    const singleCheck = (skuId,selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    // 全选框值的改变
    const checkAll = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 计算属性
    // 1. 总数量之和
    const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count,0))
    // 2. 总价之和
    const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price,0))
    // 3. 是否全选
    const isAll = computed(() => cartList.value.every(item => item.selected))
    // 4. 已选择数量之和
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count,0))
    // 5. 已选择总价
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count * c.price,0))
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        deleteCart,
        singleCheck,
        checkAll,
        clearCart
    }
},{
    persist:true
})