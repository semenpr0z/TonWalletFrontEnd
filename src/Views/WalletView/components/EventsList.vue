<script>
import EventItem from "./EventItem.vue";

import { useJettonStore } from "@/stores/jettonStore.js";

export default {
  setup() {
    const jettonStore = useJettonStore();
    return {
      jettonStore,
    };
  },
  components: {
    EventItem,
  },
};
</script>

<template>
    
  <ol class="list mt-5">
    <!-- <li
      v-for="event in jettonStore.walletEvents"
      class="list-group-item "
    >
      <div class="ms-2 me-auto event" v-for="action in event.actions">
        <div class="fw-bold">{{ action.simple_preview.name }}</div>
        <div class="description">
          <span>
            {{ action.simple_preview.description }}
          </span>
        </div>
      </div>
    </li> -->
    <EventItem v-for="event in jettonStore.walletEvents" :event="event" />
  </ol>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  list-style: none;
  padding: 0
}
</style>
