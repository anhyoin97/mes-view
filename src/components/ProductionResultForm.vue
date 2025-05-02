<template>
    <div>
        <h2>📈 생산실적 등록</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label>설비 ID:</label>
                <input v-model="result.equipmentId" type="number" required />
            </div>
            <div>
                <label>작업지시 ID:</label>
                <input v-model="result.workOrderId" type="number" required />
            </div>
            <div>
                <label>생산 수량:</label>
                <input v-model="result.producedQty" type="number" required />
            </div>
            <div>
                <label>불량 수량:</label>
                <input v-model="result.defectiveQty" type="number" required />
            </div>
            <div>
                <label>시작 시간:</label>
                <input v-model="result.startTime" type="datetime-local" required />
            </div>
            <div>
                <label>종료 시간:</label>
                <input v-model="result.endTime" type="datetime-local" required />
            </div>
            <button type="submit">등록</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductionResultForm',
    data() {
        return {
            result: {
                equipmentId: '',
                workOrderId: '',
                producedQty: 0,
                defectiveQty: 0,
                startTime: '',
                endTime: ''
            }
        }
    },
    methods: {
        submitForm() {
            const resultToSend = {
                ...this.result,
                startTime: this.result.startTime + ':00',
                endTime: this.result.endTime + ':00'
            }
            axios.post('http://localhost:8080/results', resultToSend)
                .then(() => {
                    alert('생산실적이 성공적으로 등록되었습니다!')
                    this.result = {
                        equipmentId: '',
                        workOrderId: '',
                        producedQty: 0,
                        defectiveQty: 0,
                        startTime: '',
                        endTime: ''
                    }
                })
                .catch(err => {
                    console.error('등록 실패:', err)
                })
        }
    }
}
</script>