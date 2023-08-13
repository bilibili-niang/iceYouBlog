import { createApp } from 'vue'
import router from "./router"
import 'icepro/docs/style.css'
import icepro from 'icepro/docs/icepro'

import App from './App.vue'

const app = createApp(App)


icepro.install(app)

app
    .use(router)
    .mount('#app')
