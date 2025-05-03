<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">실시간 모니터링 대시보드</h1>

    <div class="chart-grid">
      <EquipmentStatusChart />
      <WorkOrderCountByProductChart />
      <ProductionTrendChart />
      <DefectRateChart />
    </div>
  </div>
</template>

<script setup>
import EquipmentStatusChart from './EquipmentStatusChart.vue'
import WorkOrderCountByProductChart from './WorkOrderCountByProductChart.vue'
import ProductionTrendChart from './ProductionTrendChart.vue'
import DefectRateChart from './DefectRateChart.vue'
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.dashboard-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}
</style>