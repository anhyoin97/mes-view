<template>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from './components/Header.vue';

export default {
  components: {
    MainHeader
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: 'Segoe UI', sans-serif;
}

</style>