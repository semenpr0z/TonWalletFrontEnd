<script>
import AccountInput from "@/components/AccountInput.vue";

export default {
  components: {
    AccountInput,
  },
};
</script>

<template>
  <header class="p-3 bg-dark text-white ">
    <div class="container d-flex justify-content-between ">
      <div
        class="d-flex  align-items-center justify-content-start gap-3"
      >
        <img class="ton-logo" src="/svg/ton-logo.svg" alt="" />
        <span class="name">Tonviewer 2.0</span>
      </div>
      <AccountInput />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.ton-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.name {
  font-size: 24px;
  font-weight: 600;
}
</style>
