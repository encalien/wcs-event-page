<script lang="ts">
export default {};
</script>

<template>
  <section>
    <h1>{{ $t("registration.pageTitle") }}</h1>
    <p>{{ $t("registration.opensSoonText") }}</p>
    <!-- <p class="center-text" v-html="$t('registration.registrationInfoText')"></p>
    <iframe src="https://forms.gle/ER6ytwcGoRDYZw1X8">{{
      $t("registration.loading")
    }}</iframe> -->
  </section>
</template>

<style scoped>
section {
  height: 60vh;
}

iframe {
  width: 100%;
  height: calc(100vh - 200px);
  border: none;
}
</style>
