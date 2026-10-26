<template>
  <div class="weather-page">
    <div class="weather-container">
      
      <div class="main-content">
        
        <!-- Search Bar -->
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            @keyup.enter="handleSearch" 
            placeholder="Search location (e.g. Manila, Tokyo)..." 
            class="search-input"
          />
          <button @click="handleSearch" class="search-btn">Search</button>
        </div>

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
import { ref, onMounted } from 'vue'

const searchQuery = ref('')

const weather = ref({
  location: 'Loading...',
  date: '',
  condition: '',
  conditionIcon: '☀️',
  temperature: 0
})

const metrics = ref({
  feelsLike: 0,
  humidity: 0,
  wind: 0,
  pressure: 0
})

const dailyForecast = ref([])

// Helper function to map WeatherAPI condition text/codes to emojis
const getWeatherEmoji = (text) => {
  const condition = text.toLowerCase()
  if (condition.includes('thunder')) return '⛈️'
  if (condition.includes('rain') || condition.includes('drizzle')) return '🌧️'
  if (condition.includes('cloud') || condition.includes('overcast')) return '⛅'
  if (condition.includes('snow')) return '❄️'
  return '☀️'
}

// Helper function to get day name (Mon, Tue, etc.) from date string
const getDayName = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

const getWeather = async (locationQuery = 'san fernando') => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3db00128016b454e99105922262610&q=${encodeURIComponent(locationQuery)}&days=7&aqi=yes&alerts=no`)
    const data = await response.json()

    if (response.ok) {
      weather.value = {
        location: `${data.location.name}, ${data.location.region}`,
        date: new Date(data.location.localtime).toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        condition: data.current.condition.text,
        conditionIcon: getWeatherEmoji(data.current.condition.text),
        temperature: Math.round(data.current.temp_c)
      }

      metrics.value = {
        feelsLike: Math.round(data.current.feelslike_c),
        humidity: data.current.humidity,
        wind: Math.round(data.current.wind_kph),
        pressure: Math.round(data.current.pressure_mb)
      }

      dailyForecast.value = data.forecast.forecastday.map(day => ({
        name: getDayName(day.date),
        icon: getWeatherEmoji(day.day.condition.text),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c)
      }))

      console.log('Successfully fetched and updated weather data:', data)
    } else {
      alert(data.error.message || 'Location not found')
    }
  } catch (err) {
    console.error('Network error fetching weather:', err)
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim() !== '') {
    getWeather(searchQuery.value)
  }
}

onMounted(() => {
  getWeather('san fernando')
})
</script>

<style scoped>
:global(body),
:global(.v-application),
:global(.v-main) {
  background-color: #0b0c1e !important;
  min-height: 100vh;
}

.weather-page {
  min-height: 100vh;
  height: auto;
  background-color: #0b0c1e;
  color: #ffffff;
  padding: 1rem 1.5rem;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center; 
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

.weather-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

/* Search Bar Styles */
.search-box {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.search-input {
  flex: 1;
  background-color: #171930;
  border: 1px solid #2b32b2;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
}

.search-input::placeholder {
  color: #8e94a8;
}

.search-btn {
  background: linear-gradient(135deg, #2b32b2 0%, #1488cc 100%);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.search-btn:hover {
  opacity: 0.9;
}

.hero-card {
  background: linear-gradient(135deg, #2b32b2 0%, #1488cc 100%);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.location-header h2 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  word-break: break-word; 
}

.date-text {
  margin-top: 0.3rem;
  color: #d1e8ff;
  font-size: 0.85rem;
}

.hero-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.weather-emoji {
  font-size: 2.5rem;
}

.main-temp {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.metric-card {
  background-color: #171930;
  border-radius: 14px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.metric-label {
  color: #8e94a8;
  font-size: 0.8rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: #e2e8f0;
}

.daily-cards {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.daily-card {
  background-color: #171930;
  border-radius: 14px;
  padding: 0.7rem 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.day-name {
  font-size: 0.8rem;
  color: #a0aec0;
}

.day-icon {
  font-size: 1.2rem;
}

.day-temps {
  display: flex;
  gap: 0.3rem;
  font-size: 0.75rem;
}

.temp-high {
  color: #ffffff;
  font-weight: 600;
}

.temp-low {
  color: #718096;
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .daily-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .weather-page {
    padding: 0.75rem; 
    align-items: center;
  }

  .hero-card {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .hero-right {
    width: 100%;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  .location-header h2 {
    font-size: 1.2rem;
  }

  .main-temp {
    font-size: 2.2rem;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .daily-cards {
    display: flex;
    overflow-x: auto; 
    padding-bottom: 0.25rem;
    scroll-snap-type: x mandatory;
    gap: 0.4rem;
  }

  .daily-card {
    flex: 0 0 70px;
    scroll-snap-align: start;
    padding: 0.6rem 0.3rem;
  }
}
</style>