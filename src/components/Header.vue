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
    <a href="#/" class="header-item">Home</a>
    <a href="#/staff" class="header-item">Teachers</a>
    <a href="#/schedule" class="header-item">Schedule</a>
    <a href="#/location" class="header-item">Location</a>
    <a href="#/register" class="header-item">Registration</a>
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
