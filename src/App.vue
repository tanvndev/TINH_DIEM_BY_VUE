<template>
  <v-app>
    <v-main>
      <MasterLayout>
        <router-view />
      </MasterLayout>
    </v-main>
  </v-app>
</template>
<script setup>
import MasterLayout from '@/layouts/MasterLayout.vue'
</script>
