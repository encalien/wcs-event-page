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
    <div id="alert" v-if="store.alert.message" :class="store.alert.type">
      {{ store.alert.message }}
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
    color: rgb(125, 0, 0);
    background-color: rgb(255, 173, 173);
  }

  .success {
    color: rgb(0, 78, 0);
    background-color: rgb(195, 249, 195)
  }
</style>