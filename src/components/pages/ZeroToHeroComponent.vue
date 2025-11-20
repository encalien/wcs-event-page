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
  <section>
    <div class="flex-container flex-container-column">
      <h1>{{ $t("zeroToHero.pageTitle") }}</h1>
      <div v-for="(val, i) in messages.zeroToHero.description" :key="`${i}`">
        <p>
          {{ $t(`zeroToHero.description[${i}]`) }}
        </p>
        <ul v-if="i === 0">
          <li v-for="(item, j) in messages.zeroToHero.list" :key="`${j}`">
            {{ $t(`zeroToHero.list[${j}]`) }}
          </li>
        </ul>
      </div>
      <hr />
      <h1>{{ $t("location.pageTitle") }}</h1>
      <p v-html="$t(`zeroToHero.location`)"></p>
      <hr />
      <h1>{{ $t("zeroToHero.program.pageTitle") }}</h1>
      <div
        v-for="(val, j) in messages.zeroToHero.program.description"
        :key="`${j}`"
      >
        <p>
          {{ $t(`zeroToHero.program.description[${j}]`) }}
        </p>
      </div>
      <p>
        <a
          download
          :href="$t('zeroToHero.schedule.pdfSrc')"
          alt="Zero To Hero Schedule"
        >
          {{ $t("workshops.schedule.downloadText") }}
        </a>
      </p>
      <a
        target="_blank"
        :href="$t('zeroToHero.program.schedule.imgSrc')"
        alt="Schedule"
      >
        <img :src="$t('zeroToHero.program.schedule.imgSrc')" />
      </a>
      <hr />
      <h1>{{ $t("home.aboutWCS.title") }}</h1>
      <p v-for="(val, i) in messages.home.aboutWCS.description" :key="`${i}`">
        {{ $t(`home.aboutWCS.description[${i}]`) }}
      </p>
      <p
        class="bold"
        v-if="$store.state.lang === 'si'"
        v-html="$t('home.aboutWCS.moreInfo')"
      ></p>
    </div>
  </section>
  <section id="video-collage">
    <div class="video-collage-content">
      <a
        v-for="(yt, i) in messages.home.aboutWCS.yt"
        :href="$t(`home.aboutWCS.yt[${i}].href`)"
        target="_blank"
        rel="noopener noreferrer"
        :class="`item-${i + 1}`"
        :key="`${i}`"
      >
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
img {
  display: block;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.flex-container-column {
  align-items: stretch;
}

.important {
  color: var(--accent-2);
  margin: 1rem 0;
}

.registration-info {
  margin: 0;
  color: var(--accent-2);
}

#register-now-btn {
  display: block;
  width: fit-content;
  margin: 2rem auto;
  padding: 1rem 3rem;
  color: var(--accent-1);
  background-color: var(--accent-2);
  font-family: Cera Pro Bold;
  font-size: 2rem;
  text-transform: uppercase;
}

#register-now-btn:hover {
  /* background-color: #fbf9c4; */
  text-decoration: none;
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

@media screen and (max-width: 1200px) {
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
