<script>
import { useJettonStore } from "@/stores/jettonStore.js";
import router from "@/router";

export default {
  data() {
    return {
      address: "",
    };
  },
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  methods: {
    findWallet() {
      router.push(`/w/${this.address}`);
    },
  },
};
</script>

<template>
  <form @submit="findWallet()" class="form-finder">
    <input
      v-model="address"
      class="form-control form-control-lg border"
      placeholder="Enter account address"
    />
    <button class="btn btn-primary btn-lg" :disabled="!address" type="submit">
      Get Info Wallet
    </button>
  </form>
</template>

<style lang="scss" scoped>
.form-finder{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
</style>
