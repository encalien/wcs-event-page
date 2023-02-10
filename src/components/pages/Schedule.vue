<script lang="ts">
export default {

}
</script>

<template>
  <section>
    <h1>{{ $t('workshops.schedule.pageTitle') }}</h1>
    <p>{{ $t('event.tba') }}</p>
  </section>  
  <section>
    <h1>{{ $t('workshops.level.title') }}</h1>
    <p v-for="i in [0,1]">
      {{ $t(`workshops.level.descriptionText[${i}]`) }}
    </p>
  </section>
</template>

<style scoped>

</style>
