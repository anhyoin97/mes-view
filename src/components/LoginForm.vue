<template>
    <div class="login-container">
        <h2>로그인</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="이메일" required />
            <input v-model="password" type="password" placeholder="비밀번호" required />
            <button @click="login" type="submit" class="btn">로그인</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const res = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: this.email, password: this.password })
                });
                
                if (!res.ok) throw new Error('로그인 실패');
                
                const token = await res.text(); 
                const userStore = useUserStore();
                userStore.setToken(token); // Pinia store token 저장
                
                this.$router.push('/maindashboard');
            } catch (err) {
                this.error = '이메일 또는 비밀번호가 올바르지 않습니다.';
            }
        }
    }
};
</script>

<style>
.login-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 12px;
}

input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.8rem;
}

.error {
    color: red;
}
</style>