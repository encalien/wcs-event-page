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
    <h1>{{ $t('workshops.staff.pageTitle') }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item flex-basis-100 margin-0">
        <h2>{{ $t('workshops.staff.teachers.names') }}</h2>
        <p v-for="(val, i) in messages.workshops.staff.teachers.description">
          {{ $t(`workshops.staff.teachers.description[${i}]`) }}
        </p>
      </div>
      <div class="flex-item flex-basis-100 margin-0 flex-container flex-container-column">
        <img src="/src/assets/images/teachers.jpg" :alt="$t('workshops.staff.teachers.names')">
      </div>
    </div>
  </section>
</template>

<style scoped>
  img {
    height: 100%;
    width: 100%;
  }

  .flex-basis-100 {
    flex-basis: 100%;
  }
</style>
