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
  <section id="slovenia">
    <h1>{{ $t('location.slovenia.pageTitle') }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item margin-0">
        <p v-for="(p, i) in messages.location.slovenia.description">
          {{ $t(`location.slovenia.description[${i}]`) }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
