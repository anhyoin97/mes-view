<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>설비명</th>
                <th>설비코드</th>
                <th>위치</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="e in equipments" :key="e.id">
                <td>{{ e.id }}</td>
                <td>{{ e.name }}</td>
                <td>{{ e.code }}</td>
                <td>{{ e.location }}</td>
                <td>{{ e.status }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'EquipmentTable',
    props: {
        equipments: Array
    }
};
</script>

<style scoped>
@import '@/assets/common.css';
</style>