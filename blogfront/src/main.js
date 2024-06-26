import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import {createApp} from "vue";
import "element-plus/dist/index.css";
// 深色模式
import "element-plus/theme-chalk/dark/css-vars.css";
import "hover.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 导入less
import "icepro/src/assets/common.less";
import icepro from "icepro";
/*引入公共样式*/
import "@/assets/css/audio.css";
import "@/assets/css/reset.less";
import "@/assets/css/common.less";
import "@/assets/css/variables.less";

// markdown预览组件以及样式
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
/*import Prism from 'prismjs'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'*/
// 显示行数
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// 复制插件
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";


// @date 2023/5/7 , @author icestone
// 引入全局组件:
import hljs from "highlight.js";

// 编辑的组件
// 第一种:
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
});
/*VueMarkdownEditor.use(vuepressTheme, {
    Prism
})*/

VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());

const app = createApp(App);
// 引入v-md-editor编辑组件
app.use(VueMarkdownEditor);
app.use(store);
app.use(ElementPlus);

icepro.install(app);

// element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 补充
app.component("icePagination", icepro.components.icePagination);

app
  .use(router)
  .mount("#app");
