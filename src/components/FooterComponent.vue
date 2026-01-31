<script lang="ts">
export default {};
</script>

<template>
  <footer id="footer">
    <div class="footer-item">
      <p>{{ $t("contact.text") }}</p>
      <p>
        <a :href="'mailto:' + $t('contact.email')">{{ $t("contact.email") }}</a>
      </p>
    </div>
    <div class="footer-item">
      <p>&copy; {{ $t("event.name") }} 2024</p>
    </div>
  </footer>
</template>

<style scoped>
#footer {
  width: 100%;
  padding: 4rem;
  background-color: var(--color-background-alt);
  color: var(--color-text-alt);
}

.footer-item {
  text-align: center;
  margin: 10px auto;
}

.footer-item > p {
  margin-bottom: 0;
}

.footer-item > p > a {
  color: var(--accent-1);
}
</style>
