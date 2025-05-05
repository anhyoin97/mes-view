<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>설비명</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
            <label>설비코드</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="form-group">
            <label>위치</label>
            <input v-model="form.location" type="text" />
        </div>
        <div class="form-group">
            <label>상태</label>
            <select v-model="form.status" required>
                <option value="가동">가동</option>
                <option value="정지">정지</option>
                <option value="점검">점검</option>
            </select>
        </div>
        <button type="submit" class="btn">등록</button>
    </form>
</template>

<script>
export default {
    name: 'EquipmentForm',
    emits: ['created'],
    data() {
        return {
            form: {
                name: '',
                code: '',
                location: '',
                status: '가동'
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                await fetch('http://localhost:8080/equipments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.form)
                });
                alert('설비가 등록되었습니다!');
                this.$emit('created');
                this.resetForm();
            } catch (err) {
                alert('에러: ' + err.message);
            }
        },
        resetForm() {
            this.form = {
                name: '',
                code: '',
                location: '',
                status: '가동'
            };
        }
    }
};
</script>

<style scoped>
@import '@/assets/common.css';
</style>