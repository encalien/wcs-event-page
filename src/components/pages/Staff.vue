<script lang="ts">
export default {
  
}
</script>

<template>
  <div>
    <h1>{{ $t('workshops.staff.pageTitle') }}</h1>
    <div class="flex-container">
      <div class="flex-item flex-basis-40">
        <h2>{{ $t('workshops.staff.teachers.names') }}</h2>
        <p v-for="i in [0,1,]">{{ $t(`workshops.staff.teachers.description[${i}]`) }}</p>
      </div>
      <img src="/src/assets/images/daniel_marina_jump.jpg" 
           alt="{{ $t('workshops.staff.teachers.names') }}"
           class="flex-item">
    </div>
  </div>
</template>

<style scoped>
  img {
    width: 30%;
  }
</style>
