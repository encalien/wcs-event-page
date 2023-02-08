<script lang="ts">
  export default {
    data() {
      return {
        eventName: import.meta.env.VITE_APP_TITLE
      }
    }
  }
</script>

<template>
  <header id="header">
    <a href="#/" class="header-item">{{ $t('home.pageTitle') }}</a>
    <a href="#/staff" class="header-item">{{ $t('staff.pageTitle') }}</a>
    <a href="#/schedule" class="header-item">{{ $t('schedule.pageTitle') }}</a>
    <a href="#/location" class="header-item">{{ $t('location.pageTitle') }}</a>
    <a href="#/registration" class="header-item">{{ $t('registration.pageTitle') }}</a>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>
    </div>
  </header>
</template>

<style scoped>
  #header {
    display: flex;
    width: 100%;
    background-color: grey;
  }
  .header-item {
    flex: 1 1 100px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
  }
</style>
