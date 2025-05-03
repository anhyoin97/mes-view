<template>
  <div class="dashboard-container">
    <EquipmentStatusChart />
    <WorkOrderCountByProductChart />
    <ProductionTrendChart />
    <DefectRateChart />
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
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem 1rem;
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