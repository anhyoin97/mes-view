<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>이름</th>
                <th>코드</th>
                <th>스펙</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in products" :key="p.id">
                <td>{{ p.id }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.code }}</td>
                <td>{{ p.spec }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'ProductTable',
    props: {
        products: Array
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
}

thead {
    background: #f9f9f9;
}
</style>