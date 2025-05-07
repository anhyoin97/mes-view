<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>작업지시</label>
            <select v-model="form.workOrderId" required>
                <option value="">선택하세요</option>
                <option v-for="wo in workOrders" :key="wo.id" :value="wo.id">
                    {{ wo.id }} - {{ wo.product.name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>설비</label>
            <select v-model="form.equipmentId" required>
                <option value="">선택하세요</option>
                <option v-for="eq in equipments" :key="eq.id" :value="eq.id">
                    {{ eq.name }} ({{ eq.code }})
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>시작시간</label>
            <input v-model="form.startTime" type="datetime-local" required />
        </div>
        <div class="form-group">
            <label>종료시간</label>
            <input v-model="form.endTime" type="datetime-local" required />
        </div>
        <div class="form-group">
            <label>생산 수량</label>
            <input v-model.number="form.quantity" type="number" required />
        </div>
        <div class="form-group">
            <label>불량 수량</label>
            <input v-model.number="form.defectCount" type="number" required />
        </div>
        <button type="submit" class="btn">등록</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductionResultForm',
    props: {
        workOrders: Array,
        equipments: Array
    },
    emits: ['created'],
    data() {
        return {
            form: {
                workOrderId: '',
                equipmentId: '',
                startTime: '',
                endTime: '',
                quantity: 0,
                defectCount: 0
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                await axios.post('/results', this.form)
                alert('실적이 등록되었습니다!')
                this.$emit('created')
                this.resetForm()
            } catch (err) {
                alert('에러: ' + err.message)
            }
        },
        resetForm() {
            this.form = {
                workOrderId: '',
                equipmentId: '',
                startTime: '',
                endTime: '',
                quantity: 0,
                defectCount: 0
            };
        }
    }
}
</script>

<style scoped>
@import '@/assets/common.css';
</style>