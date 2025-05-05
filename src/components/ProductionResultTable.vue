<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제품명</th>
                    <th>설비명</th>
                    <th>생산수량</th>
                    <th>불량수량</th>
                    <th>시작시간</th>
                    <th>종료시간</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in paginatedResults" :key="result.id">
                    <td>{{ result.id }}</td>
                    <td>{{ result.productName }}</td>
                    <td>{{ result.equipmentName }}</td>
                    <td>{{ result.producedQty }}</td>
                    <td>{{ result.defectiveQty }}</td>
                    <td>{{ formatDateTime(result.startTime) }}</td>
                    <td>{{ formatDateTime(result.endTime) }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    name: 'ProductionResultTable',
    props: {
        results: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentPage: 0,
            pageSize: 15
        };
    },
    computed: {
        paginatedResults() {
            const start = this.currentPage * this.pageSize;
            return this.results.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.results.length / this.pageSize);
        }
    },
    methods: {
        formatDateTime(dateTimeStr) {
            const date = new Date(dateTimeStr);
            const yyyy = date.getFullYear();
            const MM = date.getMonth() + 1;
            const dd = date.getDate();
            const hh = String(date.getHours()).padStart(2, '0');
            const mm = String(date.getMinutes()).padStart(2, '0');
            const ss = String(date.getSeconds()).padStart(2, '0');
            return `${yyyy}. ${MM}. ${dd}. ${hh}:${mm}:${ss}`;
        }
    }
};
</script>

<style scoped>
.table-container {
    margin-top: 16px;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

th,
td {
    padding: 8px 12px;
    border: 1px solid #ccc;
    text-align: center;
}

th {
    background-color: #f9f9f9;
}

.pagination {
    margin-top: 12px;
    text-align: center;
}

.pagination button {
    margin: 0 4px;
    padding: 4px 10px;
    background: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
}

.pagination button.active {
    background: #333;
    color: #fff;
    border-color: #333;
}
</style>