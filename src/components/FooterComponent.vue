<script lang="ts">
export default {};
</script>

<template>
  <footer class="bg-primary text-light mt-5">
    <div class="container py-4 text-center">
      <div class="mb-3">
        <p class="mb-1">
          {{ $t("contact.text") }}
        </p>

        <p class="mb-0">
          <a :href="'mailto:' + $t('contact.email')" class="link-light">
            {{ $t("contact.email") }}
          </a>
        </p>
      </div>

      <div>
        <p class="mb-1">
          {{ $t("event.name") }}
        </p>

        <p class="mb-0">
          <a
            href="https://wcs.kinesisrei.si"
            class="link-light"
            target="_blank"
            rel="noopener noreferrer"
            >Kinesis Rei</a
          >
          &copy; 2026
        </p>
      </div>
    </div>
  </footer>
</template>
