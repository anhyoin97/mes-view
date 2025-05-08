<template>
    <header class="header">
        <div class="logo">MES System</div>

        <div v-if="isLoggedIn" class="right-section">
            <nav class="nav">
                <router-link to="/maindashboard">대시보드</router-link>
                <router-link to="/products">제품관리</router-link>
                <router-link to="/equipments">설비관리</router-link>
                <router-link to="/work-orders">작업지시</router-link>
                <router-link to="/results">실적등록</router-link>
            </nav>
            <button class="logout-btn" @click="logout">로그아웃</button>
        </div>

        <router-link v-else to="/login">로그인</router-link>
    </header>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
    name: 'MainHeader',
    setup() {
        const userStore = useUserStore();

        const logout = () => {
            userStore.clearToken();
            // 상태가 바뀌면서 UI 자동 반영
            window.location.href = '/login';
        };

        return {
            userStore,
            logout
        };
    },
    computed: {
        isLoggedIn() {
            return !!this.userStore.token;
        }
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.right-section {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav {
    display: flex;
    gap: 32px;
}

.nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

.nav a.router-link-exact-active {
    text-decoration: underline;
    color: #2c7be5;
}

.logout-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}
</style>