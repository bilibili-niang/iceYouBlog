import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import 'hover.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/*引入公共样式*/
import '@/assets/css/reset.less'

// markdown预览组件以及样式
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
// @date 2023/5/7 , @author icestone
import Prism from 'prismjs';
// 引入所有语言包,管他妈的直接全部引入
import hljs from 'highlight.js';

// @date 2023/5/6 , @author icestone
// TODO 编辑的组件
// 第一种:
VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs
});

VueMarkdownEditor.use(createLineNumbertPlugin());

const app = createApp(App)
// @date 2023/5/6 , @author icestone
// 引入v-md-editor预览组件
app.use(VueMarkdownEditor);

app.use(store)
app.use(ElementPlus)


// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 引入全局组件:
import IndexHeader from '@/components/index/IndexHeader.vue'

app.component('IndexHeader', IndexHeader)

app.use(ElementPlus)

app.use(router).mount('#app')
