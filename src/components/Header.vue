<template>
    <header class="header">
        <div class="logo">MES System</div>

        <!-- 로그인 상태일 때만 메뉴와 로그아웃 버튼 노출 -->
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
    </header>
</template>

<script>
export default {
    name: 'MainHeader',
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token');
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
}
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