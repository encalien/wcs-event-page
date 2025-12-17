<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
    };
  },
};
</script>

<template>
  <section id="landing">
    <img
      src="/src/assets/images/website_landing_landscape.png"
      alt="banner"
      id="banner"
    />
    <div class="landing-content">
      <!-- <h1>{{ $t('event.name') }}</h1>
      <h2>{{ $t('event.location') }}</h2>
      <h2>{{ $t('event.date') }}</h2> -->
      <h2 class="margin-0">{{ $t("event.welcomeText") }}</h2>
      <!-- <h2>{{ $t("registration.opensSoonText") }}</h2> -->
      <router-link
        :to="`/${$store.state.lang}/registration`"
        class="btn btn-primary"
      >
        {{ $t("registration.pageTitle") }}
      </router-link>
    </div>
  </section>
  <section id="video-collage">
    <h1>{{ $t("home.aboutWCS.title") }}</h1>
    <p v-for="(val, i) in messages.home.aboutWCS.description" :key="i">
      {{ $t(`home.aboutWCS.description[${i}]`) }}
    </p>
    <div class="video-collage-content">
      <a
        v-for="(yt, i) in messages.home.aboutWCS.yt"
        :href="$t(`home.aboutWCS.yt[${i}].href`)"
        target="_blank"
        rel="noopener noreferrer"
        :class="`item-${i + 1}`"
        :key="i"
      >
        <h3>{{ $t(`home.aboutWCS.yt[${i}].name`) }}</h3>
        <img :src="$t(`home.aboutWCS.yt[${i}].src`)" />
      </a>
      <!-- <iframe v-for="(val, i) in messages.home.aboutWCS.yt"
        :src="'/' + $t(`home.aboutWCS.yt[${i}].src`)" 
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
  padding: 40px 0;
  max-width: calc(1200px - 80px);
}

#landing {
  background-color: var(--white);
  color: var(--dark-1);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -1rem calc(-50vw + 50%) 0;
}

.landing-content {
  flex: 1 0 auto;
  text-align: center;
  padding: 0 2rem 2rem;
}

.video-collage-content {
  display: grid;
  grid-gap: 10px;
  margin: 40px 0;
}

.video-collage-content > a {
  display: flex;
  height: calc(((1200px - 20px) / 3) * 0.56);
  align-items: center;
  overflow: hidden;
  position: relative;
  color: var(--white);
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

@media screen and (max-width: 650px) {
  #banner {
    content: url("/src/assets/images/website_landing_square.png");
  }

  #landing {
    margin: 0 -1rem;
  }

  .landing-content {
    padding: 1rem 0;
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
