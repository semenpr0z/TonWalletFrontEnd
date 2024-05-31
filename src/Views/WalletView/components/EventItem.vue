<script>
import { useJettonStore } from "@/stores/jettonStore.js";

export default {
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  methods: {
    isTonRelated(action) {
      return action.SmartContractExec?.ton_attached || action.TonTransfer;
    },
    getTransferSign(address) {
      return address === this.jettonStore.address ? "-" : "+";
    },
    isSwapTokens(action) {
      return action.simple_preview.name === "Swap Tokens";
    },
    formatSwapAmount(swap, inKey, outKey) {
      return swap[inKey]
        ? `-${this.jettonStore.formatBalance(swap[inKey])}`
        : `+${this.jettonStore.formatBalance(swap[outKey])}`;
    },
    getJettonSymbol(swap) {
      return swap.jetton_master_in?.symbol || swap.jetton_master_out?.symbol;
    },
  },
};
</script>

<template>
  <li class="p-3 border rounded">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="action in event.actions"
        :key="action.id"
      >
        <div class="d-flex gap-2 align-items-center">
          <img
            v-if="action.simple_preview.value_image"
            class="jetton-logo"
            :src="action.simple_preview.value_image"
            alt=""
          />
          <img
            v-else-if="isTonRelated(action)"
            src="/svg/ton-logo.svg"
            class="jetton-logo"
            alt=""
          />
          <div>
            <div class="fw-bold">{{ action.simple_preview.name }}</div>
            <div class="description">
              <span>{{ action.simple_preview.description }}</span>
            </div>
          </div>
        </div>
        <div class="text-end">
          <span v-if="action.SmartContractExec">
            -{{
              jettonStore.formatBalance(action.SmartContractExec.ton_attached)
            }}
            TON
          </span>
          <span v-if="action.JettonTransfer">
            {{ getTransferSign(action.JettonTransfer.sender.address)
            }}{{ jettonStore.formatBalance(action.JettonTransfer.amount) }}
            {{ action.JettonTransfer.jetton.symbol }}
          </span>
          <span v-if="action.TonTransfer">
            {{ getTransferSign(action.TonTransfer.sender.address)
            }}{{ jettonStore.formatBalance(action.TonTransfer.amount) }} TON
          </span>
          <div v-if="isSwapTokens(action)" class="amounts">
            <span class="text-end">
              {{
                formatSwapAmount(action.JettonSwap, "amount_in", "amount_out")
              }}
              {{ getJettonSymbol(action.JettonSwap) }}
            </span>
            <span class="text-end">
              {{ formatSwapAmount(action.JettonSwap, "ton_in", "ton_out") }} TON
            </span>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.jetton-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.amounts {
  display: flex;
  flex-direction: column;
}
</style>
