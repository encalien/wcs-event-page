<script lang="ts">
export default {

}
</script>

<template>
  <section id="landing">
    <img src="/src/assets/images/website_landing.svg" alt="banner" id="banner">
    <div class="landing-content">
      <!-- <h1>{{ $t('event.name') }}</h1>
      <h2>{{ $t('event.location') }}</h2>
      <h2>{{ $t('event.date') }}</h2> -->
      <h2>{{ $t('event.welcomeText') }}<br>{{ $t('registration.opensSoonText') }}</h2>
      <!-- <a href="#/registration" class="btn btn-primary">{{ $t('registration.pageTitle') }}</a> -->
    </div>
  </section>
  <section>
    <h1>{{ $t('home.aboutWCS.title') }}</h1>
    <p v-for="i in [0,1,2]">{{ $t(`home.aboutWCS.description[${i}]`) }}</p>
    <div id="video-collage">
      Here come the youtube videos.
    </div>
  </section>
</template>

<style scoped>
  #banner {
    width: 100%;
  }
  #landing {
    background-color: var(--light);
    padding: 1rem 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 -40px;
    width: calc(100% + 80px);
  }
  .landing-content {
    flex: 1 0 auto;
    text-align: center;
    padding: 2rem;
  }
</style>
