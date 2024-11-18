<script setup>
import { ref } from "vue";
import axios from "axios";

// State variables to hold the verse data
const verseText = ref("");
const verseReference = ref("");

// Function to fetch a random Bible verse from the API
const fetchRandomVerse = () => {
  axios
    .get("https://bible-api.com/?random=verse")
    .then((response) => {
      const data = response.data;
      verseText.value = data.text; // The verse text
      verseReference.value = data.reference; // The verse reference (e.g., "Ephesians 4:9")
    })
    .catch((error) => console.error("Error fetching verse:", error));
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card verse-card shadow-sm">
          <div class="card-body text-center">
            <button class="btn btn-primary mb-3" @click="fetchRandomVerse">
              Show Verse
            </button>
            <div v-if="verseText" class="verse-content">
              <h5 class="card-title">{{ verseReference }}</h5>
              <p class="card-text">{{ verseText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verse-card {
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
}

.verse-content {
  margin-top: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #343a40;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
