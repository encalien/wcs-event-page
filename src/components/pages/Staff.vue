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
    <div class="flex-container flex-container-column flex-gap">
      <div v-for="(teacher, i) in messages.workshops.staff.teachers" 
           class="flex-item flex-basis-100 margin-0 flex-container">
        <div>
          <h2>{{ $t(`workshops.staff.teachers[${i}].names`) }}</h2>
          <p v-for="(p, j) in teacher.description">
            {{ $t(`workshops.staff.teachers[${i}].description[${j}]`) }}
          </p>
        </div>
        <div class="flex-item flex-basis-100 margin-0 flex-container flex-container-column">
          <img :src="$t(`workshops.staff.teachers[${i}].src`)" 
               :alt="$t(`workshops.staff.teachers[${i}].names`)">
        </div>
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
