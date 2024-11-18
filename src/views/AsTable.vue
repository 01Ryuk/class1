<template>
  <div class="bg-info-subtle">
    <div class="container">
      <div class="min-vh-100 row justify-content-center align-items-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <router-link to="/news-site">View as List</router-link>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Writer</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in data" class="">
                        <td scope="row">{{ i + 1 }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.writer }}</td>
                        <td>{{ item.date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";

axios
  .get("https://newsapi.org/v2/top-headlines?country=ng&apiKey=YOUR_API_KEY")
  .then((response) => {
    data.value = response.data.articles;
  });

// looping
// conditional statements
// re-usable components

const data = ref([]);

const btnClicker = ref(null);

onMounted(() => {
  loadNewData();
});

function loadNewData() {
  //
  data.value = [
    {
      id: 1,
      title: "Tinubu escapes Madness",
      description: `Ada told us that Tinubu has escaped from Yaba left, and this was a serious matter, we thank God for his life`,
      writer: "Ada",
      date: "2024-08-14",
    },
    {
      id: 2,
      title: "Protests has been suspended",
      description: `The protest has just been called off anonymously by the people after the President made a speech`,
      writer: "Chizuruoke",
      date: "2024-08-13",
    },

    {
      id: 3,
      title: "reseacher make breakthrough",
      description: `Researchers of Caleb Academy founds out that the air from air cpnditioning causes drowsiness`,
      writer: "Ifeanyi",
      date: "2024-08-15",
    },
  ];
}

const currentDesc = ref("");
function loadDescriptionOfThisNews(id) {
  console.log(id);
  const news = data.value.find((x) => x.id == id);
  currentDesc.value = news.description;
  btnClicker.value.click();
}
</script>

<style scoped></style>
