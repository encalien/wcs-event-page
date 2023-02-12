<script lang="ts">
export default {

}
</script>

<template>
  <section>
    <h1>{{ $t('workshops.staff.pageTitle') }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item margin-0">
        <h2>{{ $t('workshops.staff.teachers.names') }}</h2>
        <p v-for="i in [0,1,]">{{ $t(`workshops.staff.teachers.description[${i}]`) }}</p>
      </div>
      <div class="flex-item margin-0">
        <img src="/src/assets/images/daniel_marina_stretch.jpeg" :alt="$t('workshops.staff.teachers.names')">
      </div>
    </div>
  </section>
</template>

<style scoped>
  img {
    height: 100%;
    width: 100%;
  }
</style>
