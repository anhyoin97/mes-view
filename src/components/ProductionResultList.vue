<template>
    <div class="production-result-wrapper">
        <div class="box left-box">
            <h2>✅ 생산 실적 목록</h2>
            <div class="search-bar right-align">
                <input v-model="searchProduct" placeholder="제품명으로 검색" />
                <input v-model="searchEquipment" placeholder="설비명으로 검색" />
                <button @click="filterResults" class="btn">검색</button>
                <button @click="resetSearch" class="btn">초기화</button>
            </div>

            <table class="data-table">
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
                    <tr v-for="item in paginatedData" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.productName }}</td>         
                        <td>{{ item.equipmentName }}</td>       
                        <td>{{ item.producedQty }}</td>
                        <td>{{ item.defectiveQty }}</td>
                        <td>{{ formatDateTime(item.startTime) }}</td>
                        <td>{{ formatDateTime(item.endTime) }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination center-align">
                <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page - 1 }"
                    @click="currentPage = page - 1">
                    {{ page }}
                </button>
            </div>
        </div>

        <div class="box right-box">
            <h2>➕ 생산 실적 등록</h2>
            <ProductionResultForm :workOrders="workOrders" :equipments="equipments" @created="fetchResults" />
        </div>
    </div>
</template>

<script>
import ProductionResultForm from './ProductionResultForm.vue';

export default {
    name: 'ProductionResultList',
    components: {
        ProductionResultForm
    },
    data() {
        return {
            results: [],
            filteredResults: [],
            workOrders: [],
            equipments: [],
            searchProduct: '',
            searchEquipment: '',
            currentPage: 0,
            perPage: 15
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredResults.length / this.perPage);
        },
        paginatedData() {
            const safeArray = Array.isArray(this.filteredResults) ? this.filteredResults : [];
            const start = this.currentPage * this.perPage;
            return safeArray.slice(start, start + this.perPage);
        }
    },
    methods: {
        async fetchResults() {
            const res = await fetch('http://localhost:8080/results');
            const data = await res.json();
            this.results = Array.isArray(data) ? data : [];
            this.filteredResults = Array.isArray(data) ? data : [];
        },
        async fetchWorkOrders() {
            const res = await fetch('http://localhost:8080/work-orders');
            this.workOrders = await res.json();
        },
        async fetchEquipments() {
            const res = await fetch('http://localhost:8080/equipments');
            this.equipments = await res.json();
        },
        formatDateTime(dateTimeStr) {
            if (!dateTimeStr) return '-';
            const date = new Date(dateTimeStr);
            return date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        },
        filterResults() {
            this.currentPage = 0;
            this.filteredResults = this.results.filter((item) => {
                const productMatch = item.productName.toString().includes(this.searchProduct);
                const equipmentMatch = item.equipmentName.toString().includes(this.searchEquipment);
                return productMatch && equipmentMatch;
            });
        },
        resetSearch() {
            this.searchProduct = '';
            this.searchEquipment = '';
            this.filteredResults = this.results;
            this.currentPage = 0;
        }
    },
    mounted() {
        this.fetchResults();
        this.fetchWorkOrders();
        this.fetchEquipments();
    }
};
</script>

<style scoped>
@import '../assets/common.css';
/* 있으면 공통 스타일 가져오도록 */

.production-result-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
}

.box {
    flex: 1;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
}

.left-box {
    flex: 2;
}

.right-box {
    flex: 1;
}

.right-align {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-bottom: 8px;
}

.center-align {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 10px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.data-table th,
.data-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}

button.active {
    font-weight: bold;
    border: 2px solid #000;
}
</style>