<template>
    <div class="chart-card">
        <h2 class="chart-title">제품별 작업지시 건수</h2>
        <div class="chart-scroll-box">
            <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
            <p v-else>로딩 중...</p>
        </div>
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
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 상태
const chartData = ref({
    labels: [],
    datasets: []
})
const loaded = ref(false)

const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            ticks: {
                autoSkip: false,
                font: { size: 10 }
            }
        },
        x: {
            beginAtZero: true,
            ticks: {
                precision: 0
            }
        }
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: ctx => `${ctx.label}: ${ctx.raw}건`
            }
        }
    }
}

// 마운트 시 데이터 로딩
onMounted(async () => {
    try {
        const response = await fetch('/api/dashboard/work-order-count')
        const data = await response.json()

        const labels = data.map(item => item.productName)
        const values = data.map(item => item.orderCount)

        chartData.value = {
            labels,
            datasets: [{
                label: '작업지시 건수',
                data: values,
                backgroundColor: '#64B5F6',
                borderRadius: 4
            }]
        }

        loaded.value = true
    } catch (err) {
        console.error('작업지시 건수 API 오류:', err)
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

.chart-scroll-box {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
}
</style>