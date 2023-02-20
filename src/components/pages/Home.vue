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
  <section id="landing">
    <img src="/src/assets/images/website_landing_narrow.svg" alt="banner" id="banner">
    <div class="landing-content">
      <!-- <h1>{{ $t('event.name') }}</h1>
      <h2>{{ $t('event.location') }}</h2>
      <h2>{{ $t('event.date') }}</h2> -->
      <h2 class="margin-0">{{ $t('event.welcomeText') }}<br>{{ $t('registration.opensSoonText') }}</h2>
      <!-- <a href="#/registration" class="btn btn-primary">{{ $t('registration.pageTitle') }}</a> -->
    </div>
  </section>
  <section>
    <h1>{{ $t('home.aboutWCS.title') }}</h1>
    <p v-for="(val, i) in messages.home.aboutWCS.description">{{ $t(`home.aboutWCS.description[${i}]`) }}</p>
    <div id="video-collage">
      <a v-for="(val, i) in messages.home.aboutWCS.yt"
         :href="$t(`home.aboutWCS.yt[${i}].href`)" 
         target="_blank" 
         rel="noopener noreferrer"
         :class="`item-${i + 1}`">
        <img :src="$t(`home.aboutWCS.yt[${i}].src`)" />
      </a>
      <!-- <iframe v-for="(val, i) in messages.home.aboutWCS.yt"
              :src="$t(`home.aboutWCS.yt[${i}].src`)" 
              :title="$t(`home.aboutWCS.yt[${i}].name`)" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen 
              :class="`item-${i + 1}`">
      </iframe> -->
    </div>
  </section>
</template>

<style scoped>
  #banner {
    width: 100%;
  }

  #landing {
    background-color: var(--light);
    color: var(--dark-1);
    padding: 1rem 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 -40px;
    width: 100vw;
  }

  .landing-content {
    flex: 1 0 auto;
    text-align: center;
    padding: 2rem;
  }

  #video-collage {
    display: grid;
    grid-gap: 10px;
    margin-top: 40px;
  }

  #video-collage > a {
    display: flex;
    width: calc((100vw - 100px) / 3);
    height: calc(((100vw - 100px) / 3) * 0.56);
    align-items: center;
    overflow: hidden;
  }

  #video-collage > a > img {
    width: 100%;
    height: 135%;

  }

  #video-collage > .item-1 {
    width: calc((100vw - 100px) / 3 * 2 + 10px);
    height: calc(((100vw - 100px) / 3 * 2 * 0.56) + 10px);
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  #video-collage > .item-2 {
    grid-column: 3;
    grid-row: 1;
  }

  #video-collage > .item-3 {
    grid-column: 3;
    grid-row: 2;
  }

  #video-collage > .item-4 {
    grid-column: 1;
    grid-row: 3;
  }

  #video-collage > .item-5 {
    grid-column: 2;
    grid-row: 3;
  }

  #video-collage > .item-6 {
    grid-column: 3;
    grid-row: 3;
  }

  @media screen and (max-width: 650px) {
    #banner {
      content: url('/src/assets/images/website_landing_square.svg');
    }

    #landing {
      margin: 0 -1rem;
    }

    .landing-content {
      padding: 1rem 0;
    }

    #video-collage {
      display: flex;
      flex-direction: column;
    }

    #video-collage > iframe {
      width: 100% !important;
      height: fit-content !important;
    }
  }
</style>

<!-- width="560" height="315"  -->