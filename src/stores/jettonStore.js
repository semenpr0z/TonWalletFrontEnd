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
    showTotalTonAmount() {
      const tonBalanceInTon = parseFloat(this.formatBalance(this.balance)); // Преобразование из nanos в TON и парсинг в число
      const totalJettonsInTon = this.jettons.reduce((total, jetton) => {
        const jettonBalanceInTon =
          (jetton.balance * jetton.price.prices.TON) / 10 ** 9;
        return total + jettonBalanceInTon;
      }, 0);
      return (tonBalanceInTon + totalJettonsInTon).toFixed(2);
    },
    showTotalUsdAmount() {
      const tonBalanceInUsd = (this.balance / 10 ** 9) * this.tonPrice; // Преобразование из nanos в TON и затем в USD
      const totalJettonsInUsd = this.jettons.reduce((total, jetton) => {
        const jettonBalanceInUsd = jetton.balance * jetton.price.prices.USD / 10 ** 9;
        return total + jettonBalanceInUsd;
      }, 0);
      return (tonBalanceInUsd + totalJettonsInUsd).toFixed(2);
    }
  },
});
