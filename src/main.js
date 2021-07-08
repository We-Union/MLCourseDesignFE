import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import "./css/transplate.css"

//import Api from './api/index.js';
//Vue.prototype.$api = Api;
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
