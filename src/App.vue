<script>
import Header from "@/Layout/Header/Header.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
  },
};
</script>

<template>
  <Header></Header>
  <main class="container">
    <router-view></router-view>
  </main>
  <footer></footer>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
</style>
