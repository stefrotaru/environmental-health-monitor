<template>
  <div class="widget-container">
    <div class="widget-container-header">
      <h2 class="widget-container-title">
        <Icon name="sun" />
        Current Weather
      </h2>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="widget-loading-state">
      <div class="loading-spinner"></div>
      <p>Loading weather data...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="widget-error-state">
      <Icon name="alert-triangle" />
      <p>Unable to load weather data</p>
      <button @click="$emit('retry')" class="retry-button">Try Again</button>
    </div>

    <!-- Weather data -->
    <div v-else class="widget-container-row weather-stats">
      <div class="weather-stat">
        <span class="stat-label">Temperature</span>
        <span class="stat-value">{{ data.current.temperature_2m }}°C</span>
      </div>
      <div class="weather-stat">
        <span class="stat-label">Feels Like</span>
        <span class="stat-value"
          >{{ data.current.apparent_temperature }}°C</span
        >
      </div>
      <div class="weather-stat">
        <span class="stat-label">Humidity</span>
        <span class="stat-value">{{ data.current.relative_humidity_2m }}%</span>
      </div>
    </div>

    <!-- Last updated timestamp -->
    <div class="widget-container-row last-updated">
      <small>
        <Icon name="clock" />
        Last updated: {{ formatTime(data.timestamp) }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "./Icon.vue";

interface Props {
  data: any;
  loading?: boolean;
  error?: boolean;
}

defineProps<Props>();

defineEmits<{
  retry: [];
}>();

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString();
};
</script>

