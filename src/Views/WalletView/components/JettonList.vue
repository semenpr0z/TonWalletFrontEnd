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
  <ol class="list-group w-100 mt-3">
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
            USD: jettonStore.tonPrice,
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
