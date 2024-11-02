<script lang="ts">
export default {};
</script>

<template>
  <section>
    <h1>404: {{ $t("notFound.pageTitle") }}</h1>
    <p v-html="$t('notFound.description')"></p>
  </section>
</template>

<style scoped></style>
