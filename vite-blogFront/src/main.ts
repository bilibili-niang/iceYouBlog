import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import route from "./router/index";

const app = createApp(App)
app
    .use(route)
    .mount('#app')
