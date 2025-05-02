<template>
    <div>
        <h2>🏭 설비 등록</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label>설비명:</label>
                <input v-model="equipment.name" required />
            </div>
            <div>
                <label>위치:</label>
                <input v-model="equipment.location" required />
            </div>
            <div>
                <label>상태:</label>
                <select v-model="equipment.status">
                    <option value="가동">가동</option>
                    <option value="정지">정지</option>
                    <option value="고장">고장</option>
                </select>
            </div>
            <button type="submit">등록</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'EquipmentForm',
    data() {
        return {
            equipment: {
                name: '',
                location: '',
                status: '가동'
            }
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:8080/equipments', this.equipment)
                .then(() => {
                    alert('설비가 성공적으로 등록되었습니다!')
                    this.equipment = { name: '', location: '', status: '가동' }
                })
                .catch(err => {
                    console.error('등록 실패:', err)
                })
        }
    }
}
</script>