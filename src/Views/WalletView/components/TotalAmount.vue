<script>
import { useJettonStore } from "@/stores/jettonStore.js";

export default {
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
};
</script>

<template>
  <div class="total-amount w-100 mt-3">
    <span class="ton-price">{{ jettonStore.showTotalTonAmount() }} TON</span>
    <span class="usd-price">{{ jettonStore.showTotalUsdAmount() }}$</span>
  </div>
</template>

<style lang="scss" scoped>
.total-amount {
  display: flex;
  flex-direction: column;
  align-items: center;

  .ton-price {
    font-size: 44px;
    line-height: 44px;
    font-weight: 600;
  }

  .usd-price {
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
  }
}
</style>
