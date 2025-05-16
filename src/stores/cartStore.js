import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCartStore = defineStore('cart',() => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action
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
    return {
        cartList,
        addCart
    }
},{
    persist:true
})