<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const cryptoList = ref([]);
axios
  .get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  )
  .then((res) => {
    cryptoList.value = res.data;
    console.log(res.data);
  });
</script>

<template>
  <div class="bg-dark text-light py-4">
    <div class="container">
      <div
        class="min-vh-100 row justify-content-center align-items-center my-5"
      >
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8" style="width: 95%">
            <table
              class="table table-dark table-hover table-bordered text-center"
            >
              <thead class="thead-dark">
                <tr>
                  <th scope="col" style="width: 5%">#</th>
                  <th scope="col" style="width: 50%">Coin</th>
                  <th scope="col" style="width: 20%">Current Price</th>
                  <th scope="col" style="width: 25%">Price Change (24h)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(coin, index) in cryptoList" :key="coin.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="coin.image"
                      alt="Crypto Image"
                      class="crypto-icon me-2"
                      height="23px"
                    />
                    {{ coin.name }}
                    <span class="text-muted text-uppercase fs-7 symbol-text">{{
                      coin.symbol
                    }}</span>
                  </td>
                  <td>${{ coin.current_price }}</td>
                  <td
                    :class="{
                      'text-success': coin.price_change_24h > 0,
                      'text-danger': coin.price_change_24h < 0,
                    }"
                  >
                    ${{ coin.price_change_24h }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.symbol-text {
  font-size: 0.8rem;
}

.bg-dark {
  background-color: #1b1b1b !important;
}

.table-dark {
  background-color: #2a2a2a;
}

.table-hover tbody tr:hover {
  background-color: #3a3a3a;
}

thead.thead-dark th {
  color: #ffffff;
  background-color: #343a40;
  border-color: #454d55;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.crypto-icon {
  vertical-align: middle;
}
</style>
