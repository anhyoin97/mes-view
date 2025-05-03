<!-- 일자별 생산 실적 추이 -->
<template>
    <div class="chart-card">
        <h2 class="chart-title">최근 생산 실적</h2>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartCanvas = ref(null);

onMounted(async () => {
    try {
        const response = await fetch('/api/dashboard/production-trend');
        const data = await response.json();

        // 응답 데이터 예시: [{ date: "2025-04-27", quantity: 180 }, ...]
        const labels = data.map(item => item.date);
        const quantities = data.map(item => item.quantity);

        new Chart(chartCanvas.value, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: '생산 실적',
                    data: quantities,
                    borderWidth: 2,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '생산 수량'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '날짜'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("차트 로딩 실패:", error);
    }
});
</script>

<style>
.chart-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>