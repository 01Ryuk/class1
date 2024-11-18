<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Cities list
const cities = [
  "Jos",
  "Lagos",
  "Abuja",
  "Kano",
  "Port Harcourt",
  "Delta",
  "Ibadan",
  "Katsina",
];
const selectedCity = ref("Lagos"); // Default city
const weatherData = ref({});
const tomorrowForecast = ref({}); // Store tomorrow's forecast data

// Function to fetch weather data based on the selected city
const getWeatherData = () => {
  axios
    .get(`https://goweather.herokuapp.com/weather/${selectedCity.value}`)
    .then((response) => {
      weatherData.value = response.data;
      tomorrowForecast.value = response.data.forecast[0]; // Store the first forecast (tomorrow's)
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

// Fetch data when the component is mounted and when the selected city changes
onMounted(getWeatherData);
watch(selectedCity, getWeatherData); // Watch for changes in selectedCity
</script>

<template>
  <div class="weather-widget">
    <div class="container py-4">
      <div class="min-vh-100 row justify-content-center align-items-center">
        <div class="col-lg-6">
          <div class="card weather-card shadow-sm">
            <div class="card-header text-center bg-primary text-white py-3">
              <h3 class="m-0">Weather Info</h3>
            </div>
            <div class="card-body bg-light">
              <!-- Dropdown for city selection -->
              <div class="mb-4">
                <label for="citySelect" class="form-label">Select City</label>
                <select
                  id="citySelect"
                  class="form-select"
                  v-model="selectedCity"
                >
                  <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
                  </option>
                </select>
              </div>

              <!-- Display weather information -->
              <div class="weather-details">
                <p class="temperature">
                  <strong>Temperature:</strong> {{ weatherData.temperature }}
                </p>
                <p class="wind-speed">
                  <strong>Wind Speed:</strong> {{ weatherData.wind }}
                </p>
                <p class="condition">
                  <strong>Condition:</strong> {{ weatherData.description }}
                </p>
              </div>

              <!-- Show Forecast Button -->
              <div class="d-grid mt-4">
                <button
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#forecastModal"
                >
                  Show Tomorrow's Forecast
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Tomorrow's Forecast -->
  <div
    class="modal fade"
    id="forecastModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="forecastModalTitle"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="forecastModalTitle">
            Tomorrow's Forecast
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="forecast-details text-center">
            <p>
              <strong>Temperature:</strong> {{ tomorrowForecast.temperature }}
            </p>
            <p><strong>Wind Speed:</strong> {{ tomorrowForecast.wind }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  background-color: #f0f8ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-card {
  border: none;
  border-radius: 15px;
}

.weather-card .card-header {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: #007bff;
}

.weather-card .card-body {
  background-color: #f7f9fc;
}

.weather-details p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.temperature {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f61;
}

.wind-speed,
.condition {
  font-size: 1.2rem;
  color: #6c757d;
}

#citySelect {
  font-size: 1.1rem;
}

.modal-header {
  background-color: #007bff;
}

.forecast-details p {
  font-size: 1.3rem;
  margin: 1rem 0;
}

.btn-close-white {
  filter: invert(1);
}

.bg-primary {
  background-color: #007bff !important;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
