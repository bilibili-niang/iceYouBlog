import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 导入 icepro 及其样式
import icepro from 'icepro'
import 'icepro/dist/style.css'
// 导入基础样式
import './assets/common.less'

const app = createApp(App)

// 确保 pinia 在其他任何 store 使用之前初始化
app.use(router).use(createPinia()).use(icepro).mount('#app')
