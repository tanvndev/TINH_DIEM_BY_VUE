<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>

    <v-app-bar-title class="text-capitalize">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn icon v-if="isShowDotsHorizontal" @click.stop="emits('onClickDotsHorizontal')">
      <v-icon>mdi-dots-horizontal</v-icon>
    </v-btn>
  </v-app-bar>
  <slot name="dots-horizontal"></slot>
</template>
<script setup>
import { ref } from 'vue'

const emits = defineEmits(['onClickDotsHorizontal'])

const props = defineProps({
  title: {
    type: String,
    default: 'Trang chủ',
  },
  isShowDotsHorizontal: {
    type: Boolean,
    default: false,
  },
})
</script>
