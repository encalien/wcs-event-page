<script lang="ts">
  export default {

  }
</script>

<template>
  <footer id="footer">
    <div class="footer-item">
      <p>{{ $t('contact.text') }}</p>
      <p><a :href="'mailto:' + $t('contact.email')">{{ $t('contact.email') }}</a></p>
    </div>
    <div class="footer-item">
      <p>{{ $t('event.name') }}</p>
      <p>&copy;2023</p>
    </div>
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
    margin: 10px auto;
  }
</style>
