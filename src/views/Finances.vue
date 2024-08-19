<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";


const cryptos = ref([])
axios
    .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    .then((response) => {
        cryptos.value = response.data;
        console.log(response.data);
    });

</script>

<template>
    <div class="bg-info-subtle">
        <div class="container">
            <div class="min-vh-100 row justify-content-center align-items-center">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8" style="width: 95%;">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" style="width: 5%;">#</th>
                                    <th scope="col" style="width: 50%;">Coin</th>
                                    <th scope="col" style="width: 20%;">Current Price</th>
                                    <th scope="col" style="width: 25%;">Price Change (24h)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Example row -->
                                    <tr v-for="(crypto, x) in cryptos">
                                        <th scope="row">{{ x + 1 }}</th>
                                        <td>
                                            <img :src="crypto.image"
                                                alt="Bitcoin" class="crypto-icon" height="23px"> &nbsp;
                                            {{ crypto.name }}  <span class="text-muted text-uppercase fs-7 symbolSize">{{ crypto.symbol }}</span>
                                            
                                        </td>
                                        <td>${{ crypto.current_price }}</td>
                                        <td>${{ crypto.price_change_24h }}
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
.symbolSize{
    font-size: 0.8rem;
}

</style>
