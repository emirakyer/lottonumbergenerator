// composables/useGameLogic.js
import { ref } from 'vue'
import axios from 'axios'

export function useGameLogic() {
  const numbers = ref(Array(6).fill(null))
  const totalDraws = ref(0)
  const lastDrawCount = ref(0)
  const mostCommonNumber = ref(null)

  const fetchStatistics = async () => {
    const stats = await axios.get('/api/stats/')
    lastDrawCount.value = stats.data.last_24h
    totalDraws.value = stats.data.total_draws
    mostCommonNumber.value = stats.data.most_common
  }

  const generateNumbers = async () => {
    const response = await axios.get('/api/generate/')
    numbers.value = response.data.numbers
    await fetchStatistics()
  }

  return {
    numbers,
    totalDraws,
    lastDrawCount,
    mostCommonNumber,
    generateNumbers,
    fetchStatistics
  }
}
