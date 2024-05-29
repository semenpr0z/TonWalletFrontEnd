// store.js
import { defineStore } from "pinia";
import axios from "axios";

export const useJettonStore = defineStore("jetton", {
  state: () => ({
    accountId: "",
    balance: null,
    jettons: [],
    loading: false,
    error: null,
    tonPrice: null,
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const responseJettons = await axios.get(
          `https://tonapi.io/v2/accounts/${this.accountId}/jettons?currencies=ton,usd`
        );
        const responseBalance = await axios.get(
          `https://tonapi.io/v2/accounts/${this.accountId}`
        );
        const responseTonPrice = await axios.get(
          `https://tonapi.io/v2/rates/markets`
        );
        this.jettons = responseJettons.data.balances;
        this.balance = responseBalance.data.balance;
        this.tonPrice = responseTonPrice.data.markets[0].usd_price;
      } catch (err) {
        this.error =
          "Failed to fetch jettons. Please check the account ID and try again.";
      } finally {
        this.loading = false;
      }
    },
    formatBalance(balance) {
      const balanceInTon = balance / 10 ** 9; // Преобразование из nanos в TON
      return balanceInTon.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      });
    },
    showBalanceDollars(jetton) {
      const value = this.formatBalance(
        jetton.balance * jetton.price.prices.USD
      );
      return this.parseNumber(value).toFixed(2);
    },
    showBalanceTon(jetton) {
      const value = this.formatBalance(
        jetton.balance * jetton.price.prices.TON
      );
      return this.parseNumber(value).toFixed(2);
    },
    parseNumber(string) {
      const cleanedString = string.replace(/\s/g, "").replace(/ /g, "");
      const normalizedString = cleanedString.replace(",", ".");
      return parseFloat(normalizedString);
    },
  },
});
