<script>
import axios from "axios";

export default {
  data() {
    return {
      accountId: "",
      jettons: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchJettons() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `https://tonapi.io/v2/accounts/${this.accountId}/jettons?currencies=ton,usd`
        );
        this.jettons = response.data.balances;
        console.log(response.data.balances);
      } catch (err) {
        this.error =
          "Failed to fetch jettons. Please check the account ID and try again.";
      } finally {
        this.loading = false;
      }
    },
    formatBalance(balance) {
      const balanceInTon = balance / 10 ** 9; // Преобразование из nanos в TON
      return balanceInTon.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      });
    },
  },
};
</script>

<template>
  <div id="app">
    <h1>Jettons for Account</h1>
    <input v-model="accountId" placeholder="Enter account ID" />
    <button @click="fetchJettons">Get Jettons</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="jettons">
      <li v-for="jetton in jettons" :key="jetton.id" class="jetton">
        <img :src="jetton.jetton.image" alt="" class="img" />
        <div class="jetton__data">
          <span>{{ jetton.jetton.name }}</span>
          <span>price: {{ jetton.price.prices.USD.toFixed(4) }}</span>
          <span>amount: {{ formatBalance(jetton.balance) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.jetton {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  &__data {
    display: flex;
    flex-direction: column;
    align-items: flex-start
  }
}

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
