<script lang="ts">
import { store } from '../store';

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>
    <div id="alert" v-if="store.alert.messageKey" :class="store.alert.type">
      {{ $t(`alert.${store.alert.messageKey}`) }}
      <div id="close-alert" @click="store.clearAlert()">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </div>
    </div>
</template>

<style scoped>
  #alert {
    padding: 1.5rem 0 1.5rem 1.5rem;
    margin: 1rem auto;
    line-height: 1rem;
    color: var(--black-soft);
  }

  #close-alert {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.2rem;
    padding: 0.5rem;
    width: 2.8rem;
    height: 4rem;
    text-align: center;
    cursor: pointer;
  }

  .error {
    background-color: var(--error);
  }

  .success {
    background-color: var(--success);
  }
</style>