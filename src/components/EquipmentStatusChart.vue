<template>
    <div class="chart-card">
        <h2 class="chart-title">설비 상태 비율</h2>
        <div class="doughnut-wrapper">
            <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
            <p v-else>로딩 중...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import axios from 'axios'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = ref({
    labels: [],
    datasets: [],
})

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
}

const loaded = ref(false)

onMounted(async () => {
    try {
        const res = await axios.get('/api/dashboard/equipment-status') 
        const data = res.data

        const labels = Object.keys(data)
        const values = Object.values(data)

        chartData.value = {
            labels: labels,
            datasets: [
                {
                    label: '설비 상태',
                    data: values,
                    backgroundColor: ['#4CAF50', '#E57373'],
                },
            ],
        }

        loaded.value = true
    } catch (err) {
        console.error('설비 상태 API 오류:', err)
    }
})
</script>

<style scoped>
.chart-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 400px;
    display: flex;
    flex-direction: column;
}

.chart-title {
    font-weight: bold;
    margin-bottom: 12px;
    text-align: left;
}

.doughnut-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 300px;
    max-width: 300px;
    margin: 0 auto;
}
</style>