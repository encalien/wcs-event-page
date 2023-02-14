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

    <div id="schedule-table" class="grid-container">
      <div v-for="i in [...Array(messages.workshops.schedule.days.length).keys()]" class="grid-container grid-gap">
        <h3 class="grid-row">{{ $t(`workshops.schedule.days[${i}].title`) }}</h3>
        <div v-for="j in [...Array(messages.workshops.schedule.days[i].items.length).keys()]" class="grid-row grid-container">
          <div class="grid-row mobile-small">{{ $t(`workshops.schedule.days[${i}].items[${j}].time`) }}</div>
          <div class="grid-row" :class="$t(`workshops.schedule.days[${i}].items[${j}].class`)">
            {{ $t(`workshops.schedule.days[${i}].items[${j}].topic`) }}<br>
            <small>{{ $t(`workshops.schedule.days[${i}].items[${j}].description`) }}</small>
          </div>
        </div>
        <!-- <hr> -->
      </div>
    </div>

  </section>  
  <section>
    <h1>{{ $t('workshops.level.title') }}</h1>
    <p v-for="i in [...Array(messages.workshops.level.descriptionText.length).keys()]">
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
