<template>
  <div class="bg-info-subtle">
    <div class="container">
      <div class="min-vh-100 row justify-content-center align-items-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <router-link to="/">Back to home page</router-link>
                <router-link class="float-end" to="/as-table"
                  >View as Table</router-link
                >
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li v-for="item in data" :key="item" class="list-group-item">
                    {{ item.title }}
                    <div class="fst-italic">
                      By {{ item.writer }}
                      <span class="text-muted">- {{ item.date }}</span>
                    </div>

                    <div class="float-end">
                      <button
                        @click="loadDescriptionOfThisNews(item.id)"
                        class="btn btn-primary btn-sm"
                      >
                        Read news
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal trigger button -->
  <button
    ref="btnClicker"
    type="button"
    class="btn btn-primary btn-lg d-none"
    data-bs-toggle="modal"
    data-bs-target="#modalId"
  >
    Launch
  </button>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div
    class="modal fade"
    id="modalId"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">News In full</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ currentDesc }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";

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
