<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <MasterLayout>
          <router-view />
        </MasterLayout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import MasterLayout from '@/layouts/MasterLayout.vue'
</script>
