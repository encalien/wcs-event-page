<script lang="ts">
export default {
  
}
</script>

<template>
  <div>
    <h1>404: {{ $t('notFound.pageTitle') }}</h1>
    <p v-html="$t('notFound.description')"></p>
  </div>
</template>

<style scoped>
</style>
