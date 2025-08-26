<template>
  <div class="container">
    <h1>Environmental Health Monitor</h1>
    <WeatherCard
        v-if="weatherData"
        :data="weatherData"
        @refresh-weather="refreshWeather"
    />
    <HealthAlert 
        v-if="healthData"
        :recommendations="healthData?.recommendations"
        :air-quality-advice="healthData?.airQualityAdvice"
        :last-updated="healthData?.timestamp"
        @refresh-health="refreshHealth"
    />
  </div>
</template>

<script setup>
import WeatherCard from '../components/WeatherCard.vue'
import HealthAlert from '../components/HealthAlert.vue'
import AirQualityHistory from '../components/AirQualityHistory.vue'

const { data: weatherData } = await useFetch('/api/weather/current')
const { data: healthData } = await useFetch('/api/health/recommendations', {
  query: computed(() => ({
    temp: weatherData.value?.current?.temperature_2m,
    humidity: weatherData.value?.current?.relative_humidity_2m
  }))
})

const refreshWeather = async () => {
  console.log('Refreshing weather data...')
}

const refreshHealth = async () => {
  console.log('Refreshing health data...')
}

// Auto-refresh every 15 minutes
// setInterval(refreshWeather, 15 * 60 * 1000)
</script>