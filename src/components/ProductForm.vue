<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>제품명</label>
            <input v-model="product.name" required />
        </div>
        <div class="form-group">
            <label>제품코드</label>
            <input v-model="product.code" required />
        </div>
        <div class="form-group">
            <label>스펙</label>
            <input v-model="product.spec" />
        </div>
        <button type="submit">등록</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductForm',
    data() {
        return {
            product: { name: '', code: '', spec: '' }
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:8080/products', this.product)
                .then(() => {
                    alert('등록 완료!')
                    this.product = { name: '', code: '', spec: '' };
                    this.$emit('product-registered'); 
                })
                .catch(err => console.error('등록 실패:', err))
        }
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 12px;
}

label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
}
</style>