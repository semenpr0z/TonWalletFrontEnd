<script>
import TotalAmount from "./components/TotalAmount.vue";
import JettonList from "./components/JettonList.vue";
import { useJettonStore } from "@/stores/jettonStore.js";
import EventsList from "./components/EventsList.vue";

export default {
  data() {
    return {
      address: this.$route.params.walletAddress,
    };
  },
  components: {
    JettonList,
    TotalAmount,
    EventsList,
  },
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  watch: {
    "$route.params.walletAddress": {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.jettonStore.accountId = newVal;
          this.jettonStore.fetchData();
        }
      },
    },
  },
};
</script>

<template>
  <div class="wallet-page">
    <h1>Wallets</h1>
    <div class="spinner-border" role="status" v-if="jettonStore.loading">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-if="jettonStore.error">{{ jettonStore.error }}</div>
    <div v-if="jettonStore.jettons.length > 0" class="w-100">
      <TotalAmount />
      <JettonList />
    </div>
    <EventsList />
  </div>
</template>

<style lang="scss" scoped>
.wallet-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 50px 0;
}

.list-group {
  width: 100%;
}

.left-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.jetton {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .data {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .name-price {
    align-items: flex-start;
  }

  .value-price {
    align-items: flex-end;
  }

  .jetton-balance {
    font-weight: 600;
  }
  .jetton-usd {
    font-size: 14px;
    line-height: 14px;
  }

  .jetton-ton {
    font-size: 13px;
    line-height: 13px;
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
