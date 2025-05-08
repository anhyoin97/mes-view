import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/common.css' 

import axios from 'axios'
import { createPinia } from 'pinia';

// Axios 전역 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Axios 요청 인터셉터: 토큰 자동 주입
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

const app = createApp(App)
app.use(router) // 페이지 전환
app.use(createPinia()) //상태 관리
app.mount('#app')
