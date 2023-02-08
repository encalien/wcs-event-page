<script lang="ts">
export default {

}
</script>

<template>
  <section class="flex-container">
    <img src="src/assets/images/fb_banner.svg" alt="banner" id="banner" class="flex-item">
    <div class="flex-item flex-basis-40">
      <h1>{{ $t('event.name') }}</h1>
      <h2>{{ $t('event.location') }}</h2>
      <h2>{{ $t('event.date') }}</h2>
      <a href="#/registration">{{ $t('registration.pageTitle') }}</a>
    </div>
  </section>
  <section>
    <h1>{{ $t('home.aboutWCS.title') }}</h1>
    <p v-html="$t('home.aboutWCS.description')"></p>
    <div id="video-collage">
      Here come the youtube videos.
    </div>
  </section>
</template>

<style scoped>
  #banner {
    width: 60%;
  }

</style>
