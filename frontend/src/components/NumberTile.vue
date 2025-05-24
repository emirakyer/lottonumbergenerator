<!-- components/NumberTile.vue -->
<template>
    <div 
      class="number-tile"
      :class="{ revealed: num !== null, jackpot }"
      @click="$emit('click')"
    >
      <div class="tile-content">
        <span v-if="num !== null" class="display-2">{{ num }}</span>
        <v-icon v-else size="40" color="grey">mdi-help-circle-outline</v-icon>
      </div>
      <div class="tile-overlay"></div>
    </div>
  </template>
  
  <script setup>
  defineProps(['num', 'jackpot'])
  defineEmits(['click'])
  </script>
  
  <style scoped>
  /* Style buraya taşınabilir veya global stil kullanılabilir */
  </style>
  