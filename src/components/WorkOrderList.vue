<template>
    <div class="workorder-wrapper">
        <div class="box left-box">
            <h2>📋 작업지시 목록</h2>

            <div class="search-bar">
                <input type="text" v-model="searchProduct" placeholder="제품명으로 검색" />
                <input type="date" v-model="searchDate" />
                <button @click="applyFilter" class="btn">검색</button>
                <button @click="resetFilter" class="btn">초기화</button>
            </div>

            <WorkOrderTable :workOrders="pagedOrders" />

            <div class="pagination">
                <button v-for="page in totalPages" :key="page" @click="changePage(page - 1)"
                    :class="{ active: currentPage === page - 1 }">
                    {{ page }}
                </button>
            </div>
        </div>

        <div class="box right-box">
            <h2>➕ 작업지시 등록</h2>
            <WorkOrderForm :products="products" @created="fetchWorkOrders" />
        </div>
    </div>
</template>

<script>
import WorkOrderTable from './WorkOrderTable.vue';
import WorkOrderForm from './WorkOrderForm.vue';
import axios from 'axios';

export default {
    name: 'WorkOrderList',
    components: {
        WorkOrderTable,
        WorkOrderForm
    },
    data() {
        return {
            workOrders: [],
            filteredOrders: [],
            products: [],
            currentPage: 0,
            pageSize: 15,
            searchProduct: '',
            searchDate: ''
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredOrders.length / this.pageSize);
        },
        pagedOrders() {
            const start = this.currentPage * this.pageSize;
            return this.filteredOrders.slice(start, start + this.pageSize);
        }
    },
    methods: {
        async fetchWorkOrders() {
            try {
                const res = await axios.get('/work-orders');
                this.workOrders = res.data;
                this.filteredOrders = res.data;
                this.currentPage = 0;
            } catch (err) {
                console.error('작업지시 불러오기 실패:', err);
                alert('작업지시 목록을 불러오지 못했습니다.');
            }
        },
        async fetchProducts() {
            try {
                const res = await axios.get('/products');
                this.products = res.data;
            } catch (err) {
                console.error('제품 목록 불러오기 실패:', err);
                alert('제품 목록을 불러오지 못했습니다.');
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        applyFilter() {
            const keyword = this.searchProduct.trim().toLowerCase();
            const date = this.searchDate;

            this.filteredOrders = this.workOrders.filter(order => {
                const matchesProduct = keyword ? order.product.name.toLowerCase().includes(keyword) : true;
                const matchesDate = date ? order.dueDate.startsWith(date) : true;
                return matchesProduct && matchesDate;
            });

            this.currentPage = 0;
        },
        resetFilter() {
            this.searchProduct = '';
            this.searchDate = '';
            this.filteredOrders = this.workOrders;
            this.currentPage = 0;
        }
    },
    mounted() {
        this.fetchWorkOrders();
        this.fetchProducts();
    }
};
</script>

<style scoped>
.workorder-wrapper {
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

h2 {
    margin-bottom: 16px;
}

.pagination {
    margin-top: 1rem;
    display: flex;
    gap: 8px;
    justify-content: center;
}

.pagination button {
    padding: 6px 12px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
}

.pagination button.active {
    background: #333;
    color: white;
}

.search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    justify-content: flex-end;
}

.search-bar input {
    padding: 6px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-bar button {
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
}
</style>