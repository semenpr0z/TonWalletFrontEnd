<script>
import { useJettonStore } from "@/stores/jettonStore.js";
import router from "@/router";

export default {
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  methods: {
    findWallet() {
      const currentPath = this.$route.path;
      const newPath = `/w/${this.jettonStore.accountId}`;

      // If the current path is already /w/something, update it. Otherwise, just navigate to the new path.
      if (currentPath.startsWith("/w/")) {
        this.$router.replace(newPath);
      } else {
        this.$router.push(newPath);
      }
    },
  },
};
</script>

<template>
  <form @submit="findWallet()" class="form-finder">
    <input
      v-model="jettonStore.accountId"
      class="form-control form-control-lg border"
      placeholder="Enter account address"
    />
    <button class="btn btn-primary btn-lg" :disabled="!jettonStore.accountId" type="submit">
      Get Info Wallet
    </button>
  </form>
</template>

<style lang="scss" scoped>
.form-finder {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}
</style>
