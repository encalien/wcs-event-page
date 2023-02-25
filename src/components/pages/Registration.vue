<script lang="ts">
export default {

}
</script>

<template>
  <section>
    <h1>{{ $t('registration.pageTitle') }}</h1>
    <!-- <p>{{ $t('event.tba') }}</p> -->
    <p class="center-text" v-html="$t('registration.registrationInfoText')"></p>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeURi08L3X3FXNgUZW6QJB9NlybKJhHvDIMIkqPukcDNbdcow/viewform?embedded=true">{{ $t('registration.loading') }}</iframe>
  </section>
</template>

<style scoped>
  iframe {
    width: 100%;
    height: calc(100vh - 200px);
    border: none;
  }
</style>
