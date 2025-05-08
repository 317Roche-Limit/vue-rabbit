// 定义图片懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app){
        // 懒加载指令逻辑
        // 定义全局指令 实现图片懒加载
        app.directive('img-lazy',{
            mounted(el,binding){
            // el:指令绑定的那个元素 img
            // binding：binding.value 指令绑定元素后面绑定的表达式的值 图片url
            const {stop} = useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                    console.log(isIntersecting);
                    if(isIntersecting){
                    // 进入视口区域
                    el.src = binding.value
                    // 在监听的图片第一次完成加载后就停止监听
                    stop()
                    }
                },
                )
            }
})
    }
}