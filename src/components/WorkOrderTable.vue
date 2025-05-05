<template>
    <div class="workorder-table">
        <table>
            <thead>
                <tr>
                    <th>작업지시번호</th>
                    <th>제품명</th>
                    <th>수량</th>
                    <th>지시일</th>
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
export default {
    name: 'WorkOrderTable',
    props: {
        workOrders: {
            type: Array,
            required: true
        }
    },
    methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('ko-KR');
    }
  }
};
</script>

<style scoped>
.workorder-table {
    overflow-x: auto;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border-bottom: 1px solid #ccc;
}
</style>