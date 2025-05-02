<template>
    <div class="product-page">
        <div class="panel">
            <h2>📦 제품 목록</h2>
            <ProductList ref="productListRef" />
        </div>

        <div class="panel">
            <h2>➕ 제품 등록</h2>
            <ProductForm @product-registered="refreshProductList" />
        </div>
    </div>
</template>

<script>
import ProductList from './ProductList.vue'
import ProductForm from './ProductForm.vue'

export default {
    name: 'ProductPage',
    components: {
        ProductList,
        ProductForm
    },
    methods: {
        refreshProductList() {
            this.$refs.productListRef.fetchProducts(); 
        }
    }
}
</script>

<style scoped>
.product-page {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px;
}

.panel {
    flex: 1;
    background: #fff;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>