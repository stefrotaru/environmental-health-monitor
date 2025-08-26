<template>
  <div class="widget-container">
    <div class="widget-container-header">
      <h2 class="widget-container-title">
        <Icon name="heart-pulse" />
        Health Recommendations
      </h2>
      <div class="status-indicator" :class="overallStatus">
        {{ getStatusText() }}
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="widget-loading-state">
      <div class="loading-spinner"></div>
      <p>Analyzing environmental conditions...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="widget-error-state">
      <Icon name="alert-triangle" />
      <p>Unable to load health recommendations</p>
      <button @click="$emit('retry')" class="retry-button">Try Again</button>
    </div>

    <!-- Recommendations -->
    <div v-else-if="recommendations?.length" class="widget-container-row recommendations-list">
      <div
        v-for="(recommendation, index) in recommendations"
        :key="index"
        class="recommendation-item"
        :class="getRecommendationType(recommendation)"
      >
        <div class="recommendation-icon">
          <Icon :name="getRecommendationIcon(recommendation)" size="sm" />
        </div>
        <div class="recommendation-content">
          <p class="recommendation-text">{{ recommendation }}</p>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="widget-container-row widget-empty-state">
      <Icon name="check-circle" />
      <p>All environmental conditions are optimal!</p>
      <small>No specific health recommendations at this time.</small>
    </div>

    <!-- Additional info -->
    <div v-if="airQualityAdvice" class="widget-container-row">
      <h3>Air Quality</h3>
      <p>{{ airQualityAdvice }}</p>
    </div>

    <!-- Last updated timestamp -->
    <div class="widget-container-row last-updated">
      <small>
        <Icon name="clock" />
        Updated {{ formatUpdateTime() }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "./Icon.vue";
import { computed } from "vue";

interface Props {
  recommendations?: string[];
  airQualityAdvice?: string;
  isLoading?: boolean;
  error?: boolean;
  lastUpdated?: string;
}

const props = withDefaults(defineProps<Props>(), {
  recommendations: () => [],
  airQualityAdvice: "",
  isLoading: false,
  error: false,
  lastUpdated: "",
});

defineEmits<{
  retry: [];
}>();

const overallStatus = computed(() => {
  if (props.isLoading || props.error) return "unknown";

  const recs = props.recommendations;
  if (!recs.length) return "excellent";

  const hasWarnings = recs.some(
    (rec) =>
      rec.toLowerCase().includes("warning") ||
      rec.toLowerCase().includes("avoid") ||
      rec.toLowerCase().includes("stay indoors")
  );

  const hasCautions = recs.some(
    (rec) =>
      rec.toLowerCase().includes("consider") ||
      rec.toLowerCase().includes("high") ||
      rec.toLowerCase().includes("low")
  );

  if (hasWarnings) return "warning";
  if (hasCautions) return "caution";
  return "good";
});

const getStatusText = () => {
  switch (overallStatus.value) {
    case "excellent":
      return "Excellent";
    case "good":
      return "Good";
    case "caution":
      return "Caution";
    case "warning":
      return "Warning";
    default:
      return "Unknown";
  }
};

const getRecommendationType = (recommendation: string) => {
  const text = recommendation.toLowerCase();
  if (
    text.includes("warning") ||
    text.includes("avoid") ||
    text.includes("stay indoors")
  ) {
    return "warning";
  }
  if (
    text.includes("consider") ||
    text.includes("high") ||
    text.includes("low")
  ) {
    return "caution";
  }
  return "info";
};

const getRecommendationIcon = (recommendation: string) => {
  const text = recommendation.toLowerCase();
  if (text.includes("hydrat")) return "droplets";
  if (text.includes("warm") || text.includes("cold")) return "thermometer";
  if (text.includes("humid")) return "cloud";
  if (text.includes("outdoor")) return "sun";
  if (text.includes("indoor")) return "home";
  return "info";
};

const formatUpdateTime = () => {
  if (!props.lastUpdated) return "just now";

  const updateTime = new Date(props.lastUpdated);
  const now = new Date();
  const diffMinutes = Math.floor(
    (now.getTime() - updateTime.getTime()) / (1000 * 60)
  );

  if (diffMinutes < 1) return "just now";
  if (diffMinutes === 1) return "1 minute ago";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

  return updateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
