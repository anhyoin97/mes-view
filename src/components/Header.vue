<template>
    <header class="header">
        <div class="logo">MES System</div>
        <nav class="nav">
            <router-link to="/dashboard">대시보드</router-link>
            <router-link to="/products">제품관리</router-link>
            <router-link to="/equipments">설비관리</router-link>
            <router-link to="/work-orders">작업지시</router-link>
            <router-link to="/results">실적등록</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'MainHeader'
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
</style>