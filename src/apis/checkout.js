import request from '@/utils/http'

// 获取订单信息
export const getCheckInfoAPI = () => {
    return request({
        url:'/member/order/pre'
    })
}

// 提交订单
export const createOrderAPI = (data) => {
    return request({
        url:'/member/order',
        method:'POST',
        data
    })
}