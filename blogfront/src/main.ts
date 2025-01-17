import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'
// 深色模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'hover.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入less
import 'icepro/src/assets/common.less'

import icepro from 'icepro'

/*引入公共样式*/
import '@/style/reset.less'
import '@/style/common.less'
import '@/style/variables.less'

const app = createApp(App)
// 引入v-md-editor编辑组件
// app.use(VueMarkdownEditor);
app.use(store)
app.use(ElementPlus)

icepro.install(app)

// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// icepro组件
/*app.component('iceRow', iceRow)
app.component('iceColumn', iceColumn)*/

app.use(router).mount('#app')
