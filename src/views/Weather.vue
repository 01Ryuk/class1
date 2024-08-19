<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Cities list
const cities = ["Jos", "Lagos", "Abuja", "Kano", "Port Harcourt", "Delta", "Ibadan", "Katsina"];
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
  <div class="bg-info-subtle">
    <div class="container">
      <div class="min-vh-100 row justify-content-center align-items-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <div class="text-center flex-grow-1">Weather Info</div>
                <div><router-link to="/">Back to home page</router-link></div>
              </div>
              <div class="card-body">
                <!-- Dropdown for city selection -->
                <div class="mb-3">
                  <label for="citySelect" class="form-label">Select City</label>
                  <select id="citySelect" class="form-select" v-model="selectedCity">
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>

                <!-- Display weather information -->
                <p>Temperature: {{ weatherData.temperature }} </p>
                <p>Wind Speed: {{ weatherData.wind }} </p>
                <p>Condition: {{ weatherData.description }}</p>

                <!-- Show Forecast Button -->
                <button class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#forecastModal">
                  Show Forecast
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Tomorrow's Forecast -->
  <div class="modal fade" id="forecastModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="forecastModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="forecastModalTitle">Tomorrow's Forecast</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Temperature: {{ tomorrowForecast.temperature }} </p>
          <p>Wind Speed: {{ tomorrowForecast.wind }} </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
