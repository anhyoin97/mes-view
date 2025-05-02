<template>
    <div>
        <h2>🧾 작업지시 목록</h2>
        <table border="1" cellpadding="8">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제품명</th>
                    <th>수량</th>
                    <th>마감일</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in workOrders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.product.name }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ formatDate(order.dueDate) }}</td>
                    <td>{{ order.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'WorkOrderList',
    data() {
        return {
            workOrders: []
        }
    },
    mounted() {
        axios.get('http://localhost:8080/work-orders')
            .then(res => {
                this.workOrders = res.data
            })
            .catch(err => {
                console.error('작업지시 목록 불러오기 실패:', err)
            })
    },
    methods: {
        formatDate(datetime) {
            return datetime?.split('T')[0] || ''
        }
    }
}
</script>