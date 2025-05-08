import httpInstance from "@/utils/http";

// 获取banner数据接口
export function getBannerAPI(){
    return httpInstance({
        url:'/home/banner'
    })
}

// 获取新鲜好物数据接口
export function findNewAPI(){
    return httpInstance({
        url:'/home/new'
    })
}

// 获取人气推荐数据接口
export function getHotAPI(){
    return httpInstance({
        url:'home/hot'
    })
}
