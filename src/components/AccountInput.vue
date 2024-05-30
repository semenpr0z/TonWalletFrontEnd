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
      class="form-control border"
      placeholder="Enter account address"
    />
    <button
      class="btn btn-primary btn-lg"
      :disabled="!jettonStore.accountId"
      type="submit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="search "
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.form-finder {
  display: flex;
  // width: 100%;
  gap: 10px;
  height: 50px;

  .btn{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search{
    width: 20px;
    // height: 50%;
  }
}
</style>
