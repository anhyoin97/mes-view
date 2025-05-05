// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 각 페이지 컴포넌트 임포트
import ProductList from '../components/ProductList.vue'
import EquipmentList from '../components/EquipmentList.vue'
import WorkOrderList from '../components/WorkOrderList.vue'
import ProductionResultList from '../components/ProductionResultList.vue'
import MainDashboard from '../components/MainDashboard.vue'

const routes = [
    { path: '/', redirect: '/maindashboard' },
    { path: '/maindashboard', component: MainDashboard },
    { path: '/products', component: ProductList },
    { path: '/equipments', component: EquipmentList },
    { path: '/work-orders', component: WorkOrderList },
    { path: '/results', component: ProductionResultList }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
