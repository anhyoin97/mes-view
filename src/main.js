// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/common.css'; // ✅ 이 한 줄만 추가하면 끝!

const app = createApp(App);
app.mount('#app');


createApp(App)
    .use(router)
    .mount('#app')
