// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {componentPlugin} from '@/components/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入初始化样式文件
import '@/styles/common.scss'

// 测试接口函数
import { getCategory } from './apis/testAPI'
getCategory().then(res => {
    console.log(res);
})
// 引入懒加载指令插件并注册
import { lazyPlugin } from './directives'
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')


