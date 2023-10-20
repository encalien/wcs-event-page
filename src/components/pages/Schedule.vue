<script lang="ts">
import messages from '../../i18n/en';

export default {
  data() {
    return {
      messages: messages
    }
  }
}
</script>

<template>
  <section>
    <h1>{{ $t('workshops.schedule.pageTitle') }}</h1>
    <p>{{ $t('workshops.schedule.description') }}</p>

    <p><a download :href="$t('workshops.schedule.pdfSrc')" alt="Schedule">
      {{ $t('workshops.schedule.downloadText') }}
    </a></p>
    
    <a target="_blank" :href="$t('workshops.schedule.pngSrc')" alt="Schedule">
      <img :src="$t('workshops.schedule.pngSrc')">
    </a>
  </section>  
</template>

<style scoped>
  img {
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
