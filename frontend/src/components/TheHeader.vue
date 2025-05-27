<template>
  <div class="d-flex align-center justify-space-between mb-8">
        <h1 class="d-flex align-center text-h3 ga-5 font-weight-black gradient-text">
          Lotto Number Generator
          <v-icon size="40" class="ml-4 spin-icon">mdi-slot-machine</v-icon>
        </h1>
      </div>
      <div class="d-flex align-center justify-space-between">
        <v-chip variant="outlined" color="secondary" class="mt-2">
          <v-icon>mdi-history</v-icon>
          Draws in the Last 24 Hours: {{ lastDrawCount }}
        </v-chip>
        <ToggleTheme/>
      </div>
</template>

<script setup>
import ToggleTheme from './ToggleTheme.vue'
defineProps({
      lastDrawCount: {
        type: Number,
        default : 0
      }
})


</script>