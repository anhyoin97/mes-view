<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <MainHeader />
    <main class="max-w-6xl mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import MainHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
body {
  margin-top: 50px;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', sans-serif;
}

main {
  margin-top: 50px;
}
</style>