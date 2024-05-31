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
};
</script>

<template>
  <li class="p-3 border rounded">
    <!-- <div class="ms-2 me-auto event" v-for="action in event.actions">
      <div class="fw-bold">{{ action.simple_preview.name }}</div>
      <div class="description">
        <span>
          {{ action.simple_preview.description }}
        </span>
      </div>
    </div> -->

    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="action in event.actions"
      >
        <div class="d-flex gap-2">
          <img
            v-if="action.simple_preview.value_image"
            class="jetton-logo"
            :src="action.simple_preview.value_image"
            alt=""
          />
          <img
            v-else-if="
              action.SmartContractExec?.ton_attached || action.TonTransfer
            "
            src="/svg/ton-logo.svg"
            class="jetton-logo"
            alt=""
          />
          <div>
            <div class="fw-bold">{{ action.simple_preview.name }}</div>
            <div class="description">
              <span>
                {{ action.simple_preview.description }}
              </span>
            </div>
          </div>
        </div>
        <div>
          <span v-if="action.SmartContractExec">-{{
            jettonStore.formatBalance(action.SmartContractExec.ton_attached)
          }} TON</span>
          <span v-if="action.JettonTransfer">{{ action.JettonTransfer.sender.address == jettonStore.address ? '+' : '-' }}{{
            jettonStore.formatBalance(action.JettonTransfer.amount)
          }} {{ action.JettonTransfer.jetton.symbol }}</span>
          <span v-if="action.TonTransfer"
            >{{ action.TonTransfer.sender.address == jettonStore.address ? '+' : '-' }}{{
              jettonStore.formatBalance(action.TonTransfer.amount)
            }}
            TON</span
          >
          <div
            v-if="action.simple_preview.name == 'Swap Tokens'"
            class="amounts"
          >
            <span class="text-end"
              >{{
                action.JettonSwap?.amount_in
                  ? `-${jettonStore.formatBalance(action.JettonSwap.amount_in)}`
                  : `+${jettonStore.formatBalance(
                      action.JettonSwap.amount_out
                    )}`
              }}
              {{
                action.JettonSwap.jetton_master_in?.symbol ||
                action.JettonSwap.jetton_master_out?.symbol
              }}</span
            >
            <span class="text-end"
              >{{
                action.JettonSwap?.ton_out
                  ? `+${jettonStore.formatBalance(action.JettonSwap.ton_out)}`
                  : `-${jettonStore.formatBalance(action.JettonSwap.ton_in)}`
              }}
              TON</span
            >
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
