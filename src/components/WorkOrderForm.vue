<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>제품명</label>
            <select v-model="form.productId" required>
                <option value="">선택하세요</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>수량</label>
            <input v-model.number="form.quantity" type="number" required min="1" />
        </div>

        <div class="form-group">
            <label>지시일</label>
            <input v-model="form.dueDate" type="datetime-local" required />
        </div>

        <div class="form-group">
            <label>상태</label>
            <select v-model="form.status" required>
                <option value="대기">대기</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
            </select>
        </div>

        <button type="submit">등록</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WorkOrderForm',
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    emits: ['created'],
    data() {
        return {
            form: {
                productId: '',
                quantity: 1,
                dueDate: '',
                status: '대기'
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                await axios.post('http://localhost:8080/work-orders', {
                    ...this.form,
                    dueDate: this.form.dueDate + ":00"
                });
                alert('작업지시가 등록되었습니다!');
                this.$emit('created');
                this.resetForm();
            } catch (err) {
                alert('에러: ' + err.message);
            }
        },
        resetForm() {
            this.form = {
                productId: '',
                quantity: 1,
                dueDate: '',
                status: '대기'
            };
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 4px;
}

input,
select {
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
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
