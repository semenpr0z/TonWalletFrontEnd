<script>
import JettonItem from "./JettonItem.vue";
import { useJettonStore } from "@/stores/jettonStore.js";

export default {
  components: {
    JettonItem,
  },
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  computed: {
    filterJettons() {
      return this.jettonStore.jettons.filter((jetton) => {
        if (jetton.balance > 0) {
          return jetton;
        }
      });
    },
  },
};
</script>

<template>
  <ol class="list-group mt-5 w-100">
    <!-- <li class="list-group-item jetton" v-if="jettonStore.jettons.length > 0">
      <div class="left-wrapper">
        <img src="/svg/ton-logo.svg" alt="" class="img" />
        <div class="name-price data">
          <span class="fw-bold name">TON</span>
          <span class="jetton-usd">{{ jettonStore.tonPrice }}$</span>
        </div>
      </div>
      <div class="value-price data">
        <span class="jetton-balance">{{
          jettonStore.formatBalance(jettonStore.balance)
        }}</span>
        <span class="jetton-usd"
          >{{ jettonStore.formatBalance(balance * tonPrice) }}$
        </span>
      </div>
    </li> -->
    <JettonItem
      :key="0"
      :jetton="{
        jetton: {
          image: '/svg/ton-logo.svg',
          symbol: 'Toncoin',
          verification: 'whitelist',
        },
        price: {
          prices: {
            USD: jettonStore.parseNumber(jettonStore.formatBalance(jettonStore.balance * jettonStore.tonPrice)) ,
          },
        },
        balance: jettonStore.balance,
      }"
    />
    <JettonItem
      v-for="jetton in filterJettons"
      :key="jetton.id"
      :jetton="jetton"
    />
  </ol>
</template>

<style lang="scss" scoped></style>
