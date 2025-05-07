<template>
    <div class="product-wrapper">
        <div class="box left-box">
            <h2>🛠️ 설비 목록</h2>
            <div class="search-bar">
                <input v-model="searchKeyword" placeholder="설비명으로 검색" @input="filterEquipments" />
                <button class="btn" @click="resetSearch">초기화</button>
            </div>
            <EquipmentTable :equipments="paginatedEquipments" />
            <div class="pagination">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page - 1"
                    :class="{ active: currentPage === page - 1 }">
                    {{ page }}
                </button>
            </div>
        </div>
        <div class="box right-box">
            <h2>➕ 설비 등록</h2>
            <EquipmentForm @created="fetchEquipments" />
        </div>
    </div>
</template>

<script>
import EquipmentTable from './EquipmentTable.vue'
import EquipmentForm from './EquipmentForm.vue'
import axios from 'axios'

export default {
    name: 'EquipmentList',
    components: { EquipmentTable, EquipmentForm },
    data() {
        return {
            equipments: [],
            filtered: [],
            searchKeyword: '',
            currentPage: 0,
            itemsPerPage: 15
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filtered.length / this.itemsPerPage);
        },
        paginatedEquipments() {
            const start = this.currentPage * this.itemsPerPage;
            return this.filtered.slice(start, start + this.itemsPerPage);
        }
    },
    methods: {
        async fetchEquipments() {
            try {
                const res = await axios.get('/equipments') 
                this.equipments = res.data
                this.filtered = res.data
                this.currentPage = 0
            } catch (err) {
                console.error('설비 목록 로딩 실패:', err)
            }
        },
        filterEquipments() {
            const keyword = this.searchKeyword.trim().toLowerCase();
            this.filtered = this.equipments.filter(e => e.name.toLowerCase().includes(keyword));
            this.currentPage = 0;
        },
        resetSearch() {
            this.searchKeyword = '';
            this.filtered = [...this.equipments];
            this.currentPage = 0;
        }
    },
    mounted() {
        this.fetchEquipments();
    }
};
</script>

<style scoped>
@import '@/assets/common.css';

.product-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    align-items: stretch;
}

.box {
    flex: 1;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
}

.left-box {
    flex: 2;
}

.right-box {
    flex: 1;
}
</style>