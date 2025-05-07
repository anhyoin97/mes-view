<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>제품명</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
            <label>제품코드</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="form-group">
            <label>스펙</label>
            <input v-model="form.spec" type="text" />
        </div>
        <button type="submit">등록</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductForm',
    emits: ['created'],
    data() {
        return {
            form: {
                name: '',
                code: '',
                spec: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                await axios.post('/products', this.form) 
                alert('제품이 등록되었습니다!')
                this.$emit('created')
                this.form = { name: '', code: '', spec: '' }
            } catch (err) {
                alert('에러: ' + err.message)
            }
        }
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 4px;
}

input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    padding: 8px 16px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>