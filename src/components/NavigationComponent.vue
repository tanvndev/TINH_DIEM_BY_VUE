<script setup>
import { ref } from 'vue'

const value = ref(1)
</script>
<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="value" color="teal" grow>
      <v-btn>
        <v-icon>mdi-home</v-icon>

        Trang chủ
      </v-btn>

      <v-btn>
        <v-icon>mdi-heart</v-icon>

        Favorites
      </v-btn>

      <v-btn>
        <v-icon>mdi-map-marker</v-icon>

        Nearby
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
