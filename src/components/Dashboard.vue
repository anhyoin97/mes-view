<template>
  <div class="dashboard-container">
    <div class="left-panel">
      <div class="menu-card" v-for="menu in menus" :key="menu.name">
        <p class="menu-label">{{ menu.name }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MainDashboard",
  data() {
    return {
      menus: [
        { name: "대시보드", icon: "/icons/dashboard.png" },
        { name: "제품관리", icon: "/icons/product.png" },
        { name: "설비관리", icon: "/icons/equipment.png" },
        { name: "작업지시", icon: "/icons/order.png" },
        { name: "실적등록", icon: "/icons/result.png" },
      ]
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  padding: 24px;
  background: #f9f9f9;
  min-height: 100vh;
  gap: 32px;
}

.left-panel {
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-card {
  width: 160px;
  height: 140px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding-top: 20px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.menu-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.menu-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 10px;
}

.menu-label {
  font-weight: 600;
  font-size: 16px;
}

.right-panel {
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
  height: fit-content;
}

.user-box {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}

.user-role,
.user-date {
  color: #666;
  margin-bottom: 8px;
}

.user-btn {
  width: 100%;
  padding: 10px 14px;
  margin-top: 8px;
  border-radius: 4px;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
}

.user-btn.gray {
  background: #e5e5e5;
}

.user-btn.blue {
  background: #3498db;
  color: white;
}
</style>
