<script lang="ts">
  export default {
    data() {
      return {
        eventName: import.meta.env.VITE_APP_TITLE
      }
    }
  }
</script>

<template>
  <header id="header">
    <div class="header-item">{{ eventName }}</div>
    <div class="header-item">Event</div>
    <div class="header-item">Location</div>
  </header>
</template>

<style scoped>
  #header {
    display: flex;
    width: 100%;
    background-color: grey;
  }
  .header-item {
    flex: 1 1 100px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
  }
</style>
