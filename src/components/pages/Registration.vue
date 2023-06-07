<script lang="ts">
export default {

}
</script>

<template>
  <section>
    <h1>{{ $t('registration.pageTitle') }}</h1>
    <!-- <p>{{ $t('event.tba') }}</p> -->
    <p class="center-text" v-html="$t('registration.registrationInfoText')"></p>
    <iframe src="https://forms.gle/BhsHVHo98P3Qd9166">{{ $t('registration.loading') }}</iframe>
  </section>
</template>

<style scoped>
  iframe {
    width: 100%;
    height: calc(100vh - 200px);
    border: none;
  }
</style>
