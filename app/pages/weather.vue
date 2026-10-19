<template>
  <div class="weather-page">
    <div class="weather-container">
      
      <!-- Main Weather Content (Hero + Metrics + Daily Forecast) -->
      <div class="main-content">
        
        <!-- Main Weather Hero Card -->
        <div class="weather-card hero-card">
          <div class="location-header">
            <h2>{{ weather.location }}</h2>
            <p class="date-text">{{ weather.date }}</p>
          </div>
          <div class="hero-right">
            <div class="hero-icon">
              <span class="weather-emoji">{{ weather.conditionIcon }}</span>
            </div>
            <h1 class="main-temp">{{ weather.temperature }}°</h1>
          </div>
        </div>

        <!-- 4 Metrics Row (Feels Like, Humidity, Wind, Pressure) -->
        <div class="metrics-grid">
          <div class="metric-card">
            <span class="metric-label">Feels Like</span>
            <span class="metric-value">{{ metrics.feelsLike }}°</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Humidity</span>
            <span class="metric-value">{{ metrics.humidity }}%</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Wind</span>
            <span class="metric-value">{{ metrics.wind }} km/h</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Pressure</span>
            <span class="metric-value">{{ metrics.pressure }} hPa</span>
          </div>
        </div>

        <!-- Daily Forecast Section -->
        <div class="forecast-section">
          <h3 class="section-title">Daily forecast</h3>
          <div class="daily-cards">
            <div 
              v-for="(day, index) in dailyForecast" 
              :key="index" 
              class="daily-card"
            >
              <span class="day-name">{{ day.name }}</span>
              <span class="day-icon">{{ day.icon }}</span>
              <div class="day-temps">
                <span class="temp-high">{{ day.high }}°</span>
                <span class="temp-low">{{ day.low }}°</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Current weather status
const weather = ref({
  location: 'San Fernando, Pampanga',
  date: 'Monday, Oct 19, 2026',
  condition: 'LIGHT RAIN',
  conditionIcon: '🌧️',
  temperature: 31
})

// Metrics
const metrics = ref({
  feelsLike: 34,
  humidity: 82,
  wind: 12,
  pressure: 1012
})

// Daily Forecast Array
const dailyForecast = ref([
  { name: 'Mon', icon: '🌧️', high: 31, low: 25 },
  { name: 'Tue', icon: '🌦️', high: 32, low: 25 },
  { name: 'Wed', icon: '☀️', high: 33, low: 26 },
  { name: 'Thu', icon: '⛅', high: 32, low: 25 },
  { name: 'Fri', icon: '⛈️', high: 30, low: 24 },
  { name: 'Sat', icon: '🌧️', high: 29, low: 24 },
  { name: 'Sun', icon: '🌩️', high: 30, low: 25 }
])
</script>

<style scoped>
/* Main Layout Containers */
.weather-page {
  min-height: 100vh;
  background-color: #0b0c1e;
  color: #ffffff;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-container {
  max-width: 800px;
  width: 100%;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

/* Hero Card */
.hero-card {
  background: linear-gradient(135deg, #2b32b2 0%, #1488cc 100%);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.location-header h2 {
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.date-text {
  margin-top: 0.4rem;
  color: #d1e8ff;
  font-size: 0.95rem;
}

.hero-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.weather-emoji {
  font-size: 3rem;
}

.main-temp {
  font-size: 3.8rem;
  font-weight: 700;
  margin: 0;
}

/* Metric Cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.metric-card {
  background-color: #171930;
  border-radius: 14px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-label {
  color: #8e94a8;
  font-size: 0.85rem;
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 600;
}

/* Daily Forecast */
.section-title {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #e2e8f0;
}

.daily-cards {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
}

.daily-card {
  background-color: #171930;
  border-radius: 14px;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.day-name {
  font-size: 0.85rem;
  color: #a0aec0;
}

.day-icon {
  font-size: 1.4rem;
}

.day-temps {
  display: flex;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.temp-high {
  color: #ffffff;
  font-weight: 600;
}

.temp-low {
  color: #718096;
}

/* Responsive view */
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .daily-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>