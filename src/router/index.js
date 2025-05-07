import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '../components/ProductList.vue'
import EquipmentList from '../components/EquipmentList.vue'
import WorkOrderList from '../components/WorkOrderList.vue'
import ProductionResultList from '../components/ProductionResultList.vue'
import MainDashboard from '../components/MainDashboard.vue'
import LoginView from '../views/LoginView.vue' 

const routes = [
    { path: '/', redirect: '/maindashboard' },
    { path: '/login', component: LoginView },
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

// 라우터 가드: 토큰 없으면 로그인 페이지로 리다이렉트
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.path !== '/login' && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
