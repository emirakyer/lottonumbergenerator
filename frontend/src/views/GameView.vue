<!-- views/GameView.vue -->
<template>
    <v-container fluid class="background-pattern pa-0 ma-0">
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" lg="8" xl="6">
          <v-card elevation="24" class="game-card pa-8" rounded="xl">
            <TheHeader :theme="theme" :lastDrawCount="lastDrawCount" @toggle="toggleTheme" />
  
            <!-- Number Display -->
            <div class="number-display-wrapper mb-8">
              <NumberTile
                v-for="(num, index) in numbers"
                :key="index"
                :num="num"
                :jackpot="jackpotAnimation"
                @click="animateTile(index)"
              />
            </div>
  
            <!-- Controls -->
            <div class="d-flex flex-column align-center gap-4">
              <v-btn 
                block size="x-large" :loading="loading"
                class="generate-button" variant="tonal"
                @click="onSpinClick"
              >
                <template #prepend>
                  <v-avatar size="40" class="mr-2">
                    <v-img :src="slotMachineGif"></v-img>
                  </v-avatar>
                </template>
                Spin the Wheel
              </v-btn>
  
              <v-expand-transition>
                <StatsCard v-if="showStats" :totalDraws="totalDraws" :mostCommonNumber="mostCommonNumber" />
              </v-expand-transition>
            </div>
          </v-card>
  
          <vue-particles id="tsparticles" :options="confettiOptions" @load="onConfettiLoad" />
        </v-col>
      </v-row>
  
      <audio ref="clickSound" src="@/assets/sounds/click.mp3"></audio>
      <audio ref="winSound" src="@/assets/sounds/win.mp3"></audio>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import TheHeader from '@/components/TheHeader.vue'
  import NumberTile from '@/components/NumberTile.vue'
  import StatsCard from '@/components/StatsCard.vue'
  import slotMachineGif from '@/assets/slot-machine.gif'
  import { useGameLogic } from '@/composables/useGameLogic'
  import { loadFull } from 'tsparticles'
  
  // Logic
  const theme = ref('dark')
  const loading = ref(false)
  const globalLoading = ref(true)
  const particles = ref(null)
  const jackpotAnimation = ref(false)
  const showStats = ref(true)
  const clickSound = ref(null)
  const winSound = ref(null)
  
  const {
    numbers,
    totalDraws,
    lastDrawCount,
    mostCommonNumber,
    generateNumbers,
    fetchStatistics
  } = useGameLogic()
  
  onMounted(async () => {
    await fetchStatistics()
    globalLoading.value = false
  })
  
  const confettiOptions = { /* aynısı */ }
  
  const onSpinClick = async () => {
    loading.value = true
    clickSound.value?.play()
    await generateNumbers()
    await triggerJackpotAnimation()
    winSound.value?.play()
    loading.value = false
  }
  
  const triggerJackpotAnimation = async () => {
    if (!particles.value) return
    particles.value.play()
    await new Promise(r => setTimeout(r, 3000))
    particles.value.pause()
  }
  
  const onConfettiLoad = async (engine) => {
    await loadFull(engine)
    particles.value = engine
  }
  
  const toggleTheme = (val) => {
    theme.value = val
  }
  </script>
  