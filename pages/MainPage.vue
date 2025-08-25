<template>
  <div class="container">
    <h1>Environmental Health Monitor</h1>
    <WeatherCard
        v-if="weatherData"
        :data="weatherData"
        @refresh-weather="refreshWeather"
    />
  </div>
</template>

<script setup>
import WeatherCard from '../components/WeatherCard.vue'

const { data: weatherData } = await useFetch('/api/weather/current')

const refreshWeather = async () => {
  console.log('Refreshing weather data...')
}


// Auto-refresh every 15 minutes
// setInterval(refreshWeather, 15 * 60 * 1000)
</script>