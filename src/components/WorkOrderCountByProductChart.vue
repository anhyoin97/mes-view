<!-- 제품별 누적 작업지시 건수 -->
<template>
    <div class="chart-card">
        <h2 class="chart-title">제품별 작업지시 건수</h2>
        <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
        <p v-else>로딩 중...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const chartData = ref({
    labels: [],
    datasets: [],
})

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            stepSize: 1,
            ticks: {
                stepSize: 1,
                precision: 0  // 소수점 제거
            },
            title: {
                display: true,
                text: '작업 지시 건수'
            }
        }
    },
}

const loaded = ref(false)

onMounted(async () => {
    try {
        const response = await fetch('/api/dashboard/work-order-count')
        const data = await response.json()

        const labels = data.map(item => item.productName)
        const values = data.map(item => item.orderCount)

        chartData.value = {
            labels: labels,
            datasets: [
                {
                    label: '작업지시 건수',
                    data: values,
                    backgroundColor: '#42A5F5',
                },
            ],
        }

        loaded.value = true
    } catch (err) {
        console.error('작업지시 통계 API 오류:', err)
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
}

.chart-title {

    font-weight: bold;
    margin-bottom: 12px;
    text-align: left;
}
</style>