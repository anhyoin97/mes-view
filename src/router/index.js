// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 각 페이지 컴포넌트 임포트
import ProductPage from '../components/ProductPage.vue'
import EquipmentForm from '../components/EquipmentForm.vue'
import WorkOrderList from '../components/WorkOrderList.vue'
import ProductionResultForm from '../components/ProductionResultForm.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: Dashboard },
    { path: '/products', component: ProductPage },
    { path: '/equipments', component: EquipmentForm },
    { path: '/work-orders', component: WorkOrderList },
    { path: '/results', component: ProductionResultForm }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
