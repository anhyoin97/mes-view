<template>
    <div class="chart-card">
        <h2 class="chart-title">최근 불량률</h2>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import axios from 'axios' 

Chart.register(...registerables)

const chartCanvas = ref(null)

onMounted(async () => {
    try {
        const res = await axios.get('/api/dashboard/defect-trend') 
        const data = res.data 

        console.log("불량률 차트 데이터:", data)

        const labels = data.map(item => item.date)
        const rates = data.map(item => (item.defectRate).toFixed(2))

        new Chart(chartCanvas.value, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: '불량률 (%)',
                    data: rates,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.parsed.y}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => `${value}%`
                        },
                        title: { display: true, text: '불량률 (%)' }
                    },
                    x: {
                        title: { display: true, text: '날짜' }
                    }
                }
            }
        })
    } catch (error) {
        console.error("불량률 차트 로딩 실패:", error)
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
</style>