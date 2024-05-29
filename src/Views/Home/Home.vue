<script>
export default {
  name: "Home",
  data() {
    return {
      walletAddress: "",
    };
  },
};
</script>

<template>
  <div>
    <div>
      <input v-model="walletAddress" placeholder="Enter wallet address" />
      <router-link :to="`/w/${walletAddress}`"
        >Go to Jettons Page</router-link
      >
    </div>
  </div>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
</style>
