<script lang="ts">
export default {

}
</script>

<template>
  <div class="flex-container">
    <img src="src/assets/images/fb_banner.svg" alt="banner" id="banner" class="flex-item">
    <div class="flex-item flex-basis-40">
      <h1>{{ $t('home.pageTitle') }}</h1>
      <p>Welcome to our event.</p>
    </div>
  </div>
</template>

<style scoped>
  #banner {
    width: 60%;
  }

</style>
