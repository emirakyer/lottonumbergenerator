<template>
            <div class="d-flex align-center justify-space-between mb-8">
                <div>
                  <h1 class="text-h2 font-weight-black gradient-text">
                    Lotto Number Generator
                    <v-icon size="40" class="ml-2 spin-icon">mdi-slot-machine</v-icon>
                  </h1>
                  <v-chip variant="outlined" color="secondary" class="mt-2">
                    <v-icon>mdi-history</v-icon>
                    Draws in the Last 24 Hours: {{ lastDrawCount }}
                  </v-chip>
                </div>
                
                <!-- Theme Toggle -->
                <v-btn @click="toggleTheme" icon variant="text" size="x-large">
                  <v-icon>{{ theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
                </v-btn>
            </div>
</template>

<script setup>

  const props = defineProps({
      theme: {
        type: String,
        required: true
      },
      lastDrawCount: {
        type: Number,
        default : 0
      }
    })

  const emit = defineEmits(['toggle'])

  function toggleTheme() {
    emit('toggle', props.theme === 'dark' ? 'light' : 'dark')
  }



</script>

  
<style lang="scss" scoped>

</style>