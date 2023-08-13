import { createApp } from 'vue'
import router from "./router"
import icepro from 'icepro'
import 'icepro/src/assets/common.less'

import App from './App.vue'

const app = createApp(App)




app
    .use(icepro)
    .use(router)
    .mount('#app')
