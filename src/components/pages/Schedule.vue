<script lang="ts">
export default {
  
}
</script>

<template>
  <div>
    <h1>{{ $t('workshops.schedule.pageTitle') }}</h1>
    <p>To be announced.</p>

    <h1>{{ $t('workshops.level.pageTitle') }}</h1>
    <p v-for="i in [0,1]">
      {{ $t(`workshops.level.descriptionText[${i}]`) }}
    </p>
  </div>
</template>

<style scoped>
</style>
