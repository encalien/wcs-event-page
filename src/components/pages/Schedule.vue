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

    <p><a download :href="$t('workshops.schedule.src')" alt="Schedule">
      {{ $t('workshops.schedule.downloadText') }}
    </a></p>
    
    <iframe :src="$t('workshops.schedule.src')" class="schedule-frame"></iframe>     

      <!-- <embed
        :src="$t('workshops.schedule.src')"
        type="application/pdf"
        frameBorder="0"
        scrolling="auto"
        height="100%"
        width="100%" /> -->
  </section>  
</template>

<style scoped>
  .schedule-frame {
    width: 100%;
    height: 100vh;
    border: none;
  }
</style>
