<template>
  <div class="product-wrapper">
    <div class="box left-box">
      <h2>📦 제품 목록</h2>
      <div class="search-bar">
        <input type="text" v-model="searchKeyword" placeholder="제품명으로 검색" @input="filterProducts" />
        <button @click="resetSearch" class="btn">초기화</button>
      </div>
      <ProductTable :products="paginatedProducts" />
      <div class="pagination">
        <button v-for="page in totalPages" :key="page" @click="currentPage = page - 1"
          :class="{ active: currentPage === page - 1 }">
          {{ page }}
        </button>
      </div>
    </div>
    <div class="box right-box">
      <h2>➕ 제품 등록</h2>
      <ProductForm @created="fetchProducts" />
    </div>
  </div>
</template>

<script>
import ProductTable from './ProductTable.vue';
import ProductForm from './ProductForm.vue';

export default {
  name: 'ProductList',
  components: { ProductTable, ProductForm },
  data() {
    return {
      products: [],
      filtered: [],
      currentPage: 0,
      itemsPerPage: 15,
      searchKeyword: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filtered.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = this.currentPage * this.itemsPerPage;
      return this.filtered.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    async fetchProducts() {
      const res = await fetch('http://localhost:8080/products');
      const data = await res.json();
      this.products = data;
      this.filtered = data;
      this.currentPage = 0;
    },
    filterProducts() {
      const keyword = this.searchKeyword.trim().toLowerCase();
      this.filtered = this.products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      );
      this.currentPage = 0;
    },
    resetSearch() {
      this.searchKeyword = '';
      this.filtered = [...this.products];
      this.currentPage = 0;
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.product-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: stretch;
  /* 높이 맞추기 위해 추가 */
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

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
}

.search-bar input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.pagination {
  text-align: center;
  margin-top: 16px;
}

button.active {
  font-weight: bold;
  background: #333;
  color: white;
}
</style>
