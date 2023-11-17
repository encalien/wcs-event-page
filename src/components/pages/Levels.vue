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
    <h1>{{ $t('workshops.level.pageTitle') }}</h1>
    <div v-for="(level, i) in messages.workshops.levels.levels" class="flex-item flex-basis-100 margin-0">
      <h2>{{ $t(`workshops.level.levels[${i}].title`) }}</h2>
      <p v-for="(p, j) in level.descriptionText">
        {{ $t(`workshops.level.levels[${i}].descriptionText[${j}]`) }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
