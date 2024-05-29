// router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Views/Home/Home.vue";
import WalletView from "./Views/WalletView/WalletView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/w/:walletAddress?", component: WalletView, props: true },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
