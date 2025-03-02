<template>
  <div class="container">
    <div class="content-wrapper">
      <!-- Main Content -->
      <main class="main-content">
        <slot />
      </main>
      <!-- Footer -->
      <NavigationComponent />
    </div>
  </div>
</template>

<script setup>
import NavigationComponent from '@/components/NavigationComponent.vue'
</script>

<style scoped>
.main-content {
  padding: 16px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
