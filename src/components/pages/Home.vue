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
    <div class="landing-content">
      <!-- <h1>{{ $t('event.name') }}</h1> -->
      <h2 class="margin-0">{{ $t('event.welcomeText') }}</h2>
      <h2 class="important">{{ $t('event.location') }}, {{ $t('event.date') }}</h2>
      <h2>{{ $t('registration.opensSoonText') }}</h2>
      <!-- <a href="#/registration" class="btn btn-primary">{{ $t('registration.pageTitle') }}</a> -->
    </div>
    <div class="features-grid">
      <transition name="fade" mode="out-in" v-for="(feature, i) in messages.event.features">
        <a :href="$t(`event.features[${i}].href`)"
           class="feature-box flex-container flex-container-column">
          <h3 class="feature-title">{{ $t(`event.features[${i}].title`) }}</h3>
          <p v-for="(item, j) in feature.list">
            {{ $t(`event.features[${i}].list[${j}]`) }}
          </p>
          <span class="read-more">{{ $t(`event.readMoreText`) }}</span>
        </a>
      </transition>
    </div>
  </section>
  <section id="video-collage">
    <!-- <h1>{{ $t('home.aboutWCS.title') }}</h1> -->
    <!-- <p v-for="(val, i) in messages.home.aboutWCS.description">{{ $t(`home.aboutWCS.description[${i}]`) }}</p> -->
    <div class="video-collage-content">
      <a v-for="(yt, i) in messages.home.aboutWCS.yt"
         :href="$t(`home.aboutWCS.yt[${i}].href`)" 
         target="_blank" 
         rel="noopener noreferrer"
         :class="`item-${i + 1}`">
        <h3>{{ $t(`home.aboutWCS.yt[${i}].name`) }}</h3>
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
    background-color: var(--accent-1);
    width: 100vw;
    color: var(--white-soft);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: -40px calc(-50vw + 50%) 0;
  }

  .landing-content {
    flex: 1 0 auto;
    text-align: center;
    padding: 2rem 2rem 0;
  }

  .important {
    color: var(--accent-2);
    margin: 1rem 0;
  }

  .registration-info {
    margin: 0;
    color: var(--accent-2);
  }

  .features-section {
    text-align: center;
  }

  .features-grid {
    display: flex;
    justify-content: space-between;
    padding: 0 4rem 2rem;
    width: 100%;
  }

  .feature-box {
    flex: 1;
    margin: 20px;
    padding: 30px;
    background-color: var(--white-soft);
    transition: transform 0.3s ease;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .feature-box:hover {
    transform: scale(1.05);
    text-decoration: none;
  }

  .feature-box h3 {
    color: var(--accent-1);
    text-transform: uppercase;
  }

  .feature-box p {
    color: var(--black-soft);
    margin: 0 0 0.5rem 0;
    text-align: center;
  }

  .read-more {
    width: fit-content;
    color: var(--white-soft);
    background-color: var(--accent-1);
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    margin-top: 2rem;
  }

  /* Transition styles */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  #video-collage {
    margin: 4rem -40px;
  }

  .video-collage-content {
    display: grid;
    grid-gap: 10px;
    margin: 40px 0;
  }

  .video-collage-content > a {
    display: flex;
    width: calc((1200px - 20px) / 3);
    height: calc(((1200px - 20px) / 3) * 0.56);
    align-items: center;
    overflow: hidden;
    position: relative;
    color: var(--white-soft);
  }
  
  .video-collage-content > a > h3 {
    display: none;
    width: 100%;
    height: 110%;
    position: absolute;
    z-index: 1;
    padding: 2rem;
  }

  .video-collage-content > a:hover > h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
  }

  .video-collage-content > a > img {
    width: 100%;
    height: 135%;

  }

  .video-collage-content > .item-1 {
    width: calc((1200px - 20px) / 3 * 2 + 10px);
    height: calc(((1200px - 20px) / 3 * 2 * 0.56) + 10px);
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  .video-collage-content > .item-2 {
    grid-column: 3;
    grid-row: 1;
  }

  .video-collage-content > .item-3 {
    grid-column: 3;
    grid-row: 2;
  }

  .video-collage-content > .item-4 {
    grid-column: 1;
    grid-row: 3;
  }

  .video-collage-content > .item-5 {
    grid-column: 2;
    grid-row: 3;
  }

  .video-collage-content > .item-6 {
    grid-column: 3;
    grid-row: 3;
  }

  @media screen and (max-width: 1100px) {
    #banner {
      content: url('/src/assets/images/website_landing_square.png');
    }

    .features-grid {
      flex-direction: column;
      justify-content: center;
    }

    .landing-content {
      padding: 1rem;
      margin-top: 1rem;
    }

    #video-collage {
      margin: 0;
    }

    .video-collage-content {
      display: flex;
      flex-direction: column;
    }

    .video-collage-content > a {
      width: 100% !important;
      height: fit-content !important;
    }
  }
</style>
