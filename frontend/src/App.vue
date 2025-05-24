<template>
  <v-app :theme="theme">
    <!-- Global Loading Overlay -->
    <v-overlay v-model="globalLoading" class="align-center justify-center" opacity="0.9">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>

    <!-- Main Layout -->
    <v-main>
      <v-container fluid class="background-pattern pa-0 ma-0">
        <v-row align="center" justify="center" class="ma-0 pa-0">
          <v-col cols="12" md="10" lg="8" xl="6">
            <!-- Game Card -->
            <v-card elevation="24" class="game-card pa-8" rounded="xl">
              <TheHeader :theme="theme" :lastDrawCount="lastDrawCount" @toggle="toggleTheme">

              </TheHeader>

              <!-- Number Display -->
              <div class="number-display-wrapper mb-8">
                <div 
                  v-for="(num, index) in numbers" 
                  :key="index"
                  class="number-tile"
                  :class="{ 
                    'revealed': num !== null,
                    'jackpot': jackpotAnimation
                  }"
                  @click="animateTile(index)"
                >
                  <div class="tile-content">
                    <span v-if="num !== null" class="display-2">{{ num }}</span>
                    <v-icon v-else size="40" color="grey">mdi-help-circle-outline</v-icon>
                  </div>
                  <div class="tile-overlay"></div>
                </div>
              </div>

              <!-- Control Section -->
              <div class="d-flex flex-column align-center gap-4">
                <v-btn 
                  block
                  size="x-large"
                  :loading="loading"
                  @click="generateNumbers"
                  class="generate-button"
                  variant="tonal"
                >
                  <template v-slot:prepend>
                    <v-avatar size="40" class="mr-2">
                      <v-img :src="slotMachineGif"></v-img>
                    </v-avatar>
                  </template>
                  Spin the Wheel
                </v-btn>

                <!-- Statistics -->
                <v-expand-transition>
                  <v-card v-if="showStats" class="stats-card pa-4 mt-4">
                    <div class="d-flex justify-space-between">
                      <div>
                        <div class="text-caption">Total Draws</div>
                        <div class="text-h5">{{ totalDraws }}</div>
                      </div>
                      <v-divider vertical class="mx-4"></v-divider>
                      <div>
                        <div class="text-caption">Most Frequent</div>
                        <div class="text-h5">{{ mostCommonNumber || '-' }}</div>
                      </div>
                    </div>
                  </v-card>
                </v-expand-transition>
              </div>
            </v-card>

            <!-- 3D Confetti -->
            <vue-particles 
              id="tsparticles" 
              :options="confettiOptions"
              @load="onConfettiLoad"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Audio Elements -->
    <audio ref="clickSound" src="@/assets/sounds/click.mp3"></audio>
    <audio ref="winSound" src="@/assets/sounds/win.mp3"></audio>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { loadFull } from 'tsparticles'
import slotMachineGif from '@/assets/slot-machine.gif'
import TheHeader from './components/TheHeader.vue'

// Reactive State
const theme = ref('dark')
const numbers = ref(Array(6).fill(null))
const loading = ref(false)
const globalLoading = ref(true)
const particles = ref(null)
const lastDrawCount = ref(0)
const totalDraws = ref(0)
const mostCommonNumber = ref(null)
const jackpotAnimation = ref(false)
const showStats = ref(true) // veya başlangıçta false

onMounted(async () => {
  try {
    await fetchStatistics()
  } catch (e) {
    console.error("Startup stats error:", e)
  } finally {
    globalLoading.value = false
  }
})

// Confetti Configuration
const confettiOptions = {
  particles: {
    number: { value: 0 },
    color: { value: ['#FFD700', '#FF69B4', '#4B0082'] },
    shape: { type: 'circle' },
    opacity: { value: 1 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 6,
      direction: 'top',
      outModes: { default: 'destroy' }
    }
  }
}

// Methods
const toggleTheme = (themeString) => {
  theme.value = themeString
}

const generateNumbers = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/generate/')
    numbers.value = response.data.numbers
    await triggerJackpotAnimation()
    await fetchStatistics()
  } catch (e) {
    console.error("❌ Error generating numbers:", e)
  } finally {
    loading.value = false  // ✅ Doğru değişkeni kapat!
  }
}

const triggerJackpotAnimation = async () => {
  if (!particles.value) {
    console.warn("Confetti engine not loaded yet")
    return
  }

  particles.value.play()
  await new Promise(resolve => setTimeout(resolve, 3000))
  particles.value.pause()
}


const fetchStatistics = async () => {
  try {
    const stats = await axios.get('/api/stats/')
    lastDrawCount.value = stats.data.last_24h
    totalDraws.value = stats.data.total_draws
    mostCommonNumber.value = stats.data.most_common
  } catch (error) {
    console.error("❌ Failed to fetch stats:", error)
  }
}



const onConfettiLoad = async (engine) => {
  await loadFull(engine)
  particles.value = engine
}
</script>

<style scoped>


html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #000;
  overflow-x: hidden;
}

.v-application {
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden !important;
}


.background-pattern {
  background: radial-gradient(circle, rgba(25,25,25,1) 0%, rgba(15,15,15,1) 100%);
}

.game-card {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gradient-text {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number-display-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  position: relative;
}

.number-tile {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.number-tile:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.tile-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.tile-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(255,215,0,0.1), 
    rgba(255,105,180,0.1)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.number-tile:hover .tile-overlay {
  opacity: 0.3;
}

.generate-button {
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #4B0082, #6A5ACD);
  color: white !important;
}

.generate-button:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(75, 0, 130, 0.4);
}

.stats-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.spin-icon {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>