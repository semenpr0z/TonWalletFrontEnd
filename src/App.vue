<script>
import axios from "axios";

export default {
  data() {
    return {
      accountId: "",
      balance: null,
      jettons: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const responseJettons = await axios.get(
          `https://tonapi.io/v2/accounts/${this.accountId}/jettons?currencies=ton,usd`
        );
        const responeseBalance = await axios.get(
          `https://tonapi.io/v2/accounts/${this.accountId}`
        );
        this.jettons = responseJettons.data.balances;
        console.log(this.jettons);
        this.balance = responeseBalance.data.balance;
        console.log(this.balance);
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
    <input
      v-model="accountId"
      class="form-control form-control-lg border"
      placeholder="Enter account address"
    />
    <button @click="fetchData" class="btn btn-primary btn-lg" :disabled="!accountId">Get Info Wallet</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="balance">Balance: {{ formatBalance(balance) }} TON</div>

    <ol class="list-group" v-if="jettons">
      <li class="list-group-item" v-for="jetton in jettons" :key="jetton.id">
        <img :src="jetton.jetton.image" alt="" class="img" />
        <span class="fw-bold">
          {{ jetton.jetton.name }}
          <svg
            v-if="jetton.jetton.verification == `whitelist`"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#319ce3"
              fill-rule="evenodd"
              d="M7.457.627c-.259.1-.495.315-.966.742-.223.202-.334.303-.458.378a1.5 1.5 0 0 1-.546.199c-.143.022-.293.016-.593.004-.636-.024-.954-.036-1.217.053a1.5 1.5 0 0 0-.832.698c-.134.243-.177.559-.263 1.19-.04.297-.061.446-.108.583a1.5 1.5 0 0 1-.29.503c-.096.11-.215.201-.452.385-.503.39-.755.585-.899.823a1.5 1.5 0 0 0-.188 1.07c.054.272.224.541.563 1.08.16.254.24.38.292.516a1.5 1.5 0 0 1 .101.572c-.003.145-.034.292-.098.585-.135.623-.202.934-.16 1.209.058.37.251.705.543.94.217.174.52.271 1.127.466.285.091.428.137.555.207a1.5 1.5 0 0 1 .445.373c.091.113.161.246.3.511.298.564.446.845.655 1.029a1.5 1.5 0 0 0 1.02.371c.278-.006.573-.126 1.163-.367.277-.114.416-.17.559-.198.191-.038.389-.038.58 0 .143.028.282.085.56.198.589.24.884.361 1.162.367a1.5 1.5 0 0 0 1.02-.371c.209-.184.357-.465.654-1.029.14-.265.21-.398.301-.51.123-.153.274-.28.445-.374.127-.07.27-.116.556-.207.606-.195.91-.292 1.126-.466a1.5 1.5 0 0 0 .543-.94c.042-.275-.025-.587-.16-1.209-.063-.293-.095-.44-.098-.585a1.5 1.5 0 0 1 .1-.572c.053-.135.133-.262.293-.516.34-.539.51-.808.563-1.08a1.5 1.5 0 0 0-.188-1.07c-.144-.238-.396-.433-.9-.823-.236-.184-.355-.276-.45-.385a1.499 1.499 0 0 1-.29-.503c-.048-.137-.068-.286-.109-.583-.086-.631-.129-.947-.263-1.19a1.5 1.5 0 0 0-.831-.698c-.264-.09-.582-.077-1.218-.053-.3.012-.45.018-.593-.004a1.5 1.5 0 0 1-.546-.199c-.124-.075-.235-.176-.457-.378-.472-.427-.708-.641-.967-.742a1.5 1.5 0 0 0-1.086 0"
              clip-rule="evenodd"
            ></path>
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M11.03 5.97a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0L4.72 8.78a.75.75 0 0 1 1.06-1.06L7 8.94l2.97-2.97a.75.75 0 0 1 1.06 0"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>

        <span>price: {{ jetton.price.prices.USD.toFixed(4) }}$</span><br />
        <span>amount: {{ formatBalance(jetton.balance) }}</span>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" >
@import "bootstrap/scss/bootstrap";

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.jetton {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  &__data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .jetton-name {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.address-input {
  // padding: 5px 10px;
  width: 100%;
}
</style>
