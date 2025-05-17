import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

export const useCartStore = defineStore('cart',() => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - 添加购物车
    const addCart = (goods) => {
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
    // 删除商品信息
    const deleteCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(idx,1)
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
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        addCart,
        deleteCart,
        singleCheck,
        checkAll
    }
},{
    persist:true
})