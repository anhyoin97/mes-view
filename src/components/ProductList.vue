<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>이름</th>
        <th>코드</th>
        <th>스펙</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.code }}</td>
        <td>{{ product.spec }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductList',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8080/products')
        .then(res => { this.products = res.data; })
        .catch(err => console.error('목록 조회 실패:', err));
    }
  }
}
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product-table th {
  background-color: #f1f1f1;
  font-weight: bold;
}
</style>