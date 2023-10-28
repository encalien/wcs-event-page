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
           class="teacher-card" :class="{'background-accent':  i % 2 == 1}">
        <h2 class="center-text full-width">{{ $t(`workshops.staff.teachers[${i}].names`) }}</h2>
        <div class="margin-0 flex-container"
             :class="{'flex-reverse': i % 2 == 1}">
          <div class="text" :class="{'left': i % 2 == 0, 'right': i % 2 == 1}">
            <p v-for="(p, j) in teacher.description">
              {{ $t(`workshops.staff.teachers[${i}].description[${j}]`) }}
            </p>
          </div>
          <div class="image" :class="{'left': i % 2 == 1, 'right': i % 2 == 0}">
            <div class="margin-0 flex-container">
              <img :src="'/' + $t(`workshops.staff.teachers[${i}].src`)" 
                   :alt="$t(`workshops.staff.teachers[${i}].names`)">
            </div>
          </div>
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
