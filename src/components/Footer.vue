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
  <footer id="footer">
    <div class="footer-item">{{ eventName }}</div>
    <div class="footer-item">2023</div>
  </footer>
</template>

<style scoped>
  #footer {
    width: 100%;
    background-color: grey;
    padding: 1rem;
  }

  .footer-item {
    text-align: center;
  }
</style>
