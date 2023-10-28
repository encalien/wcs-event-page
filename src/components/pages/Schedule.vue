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
      <img :src="'/' + $t('workshops.schedule.pngSrc')">
    </a>
  </section>  
  <section>
    <h1>{{ $t('workshops.level.title') }}</h1>
    <p v-for="(val, i) in messages.workshops.level.descriptionText">
      {{ $t(`workshops.level.descriptionText[${i}]`) }}
    </p>
  </section>
</template>

<style scoped>
  #schedule-table {
    width: 60%;
    margin: 2rem auto;
    border: 2px solid var(--color-background-alt);
    border-radius: 2px;
  }

  h3.grid-row {
    margin: 2rem auto 0;
  }

  .class {
    background-color: var(--accent-1);
    color: var(--black-soft);
  }

  .party {
    background-color: var(--accent-2);
    color: var(--black-soft);
  }

  @media screen and (max-width: 650px) {
    #schedule-table {
      width: 100%;
    }

    .mobile-small {
      font-size: 0.8rem;
      padding: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }

</style>
