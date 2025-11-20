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
    <h1>{{ $t("intensives.pageTitle") }}</h1>
    <div style="padding: 0 1rem">
      <p v-for="(p, i) in messages.intensives.introText" :key="`${i}`">
        {{ $t(`intensives.introText[${i}]`) }}
      </p>
    </div>
    <div class="flex-container flex-container-column flex-gap">
      <div
        v-for="(track, i) in messages.intensives.tracks"
        class="track-card"
        :class="{ 'background-accent': i % 2 == 1 }"
        :key="`${i}`"
      >
        <div
          class="margin-0 flex-container"
          :class="{ 'flex-reverse': i % 2 == 1 }"
        >
          <div class="text" :class="{ left: i % 2 == 0, right: i % 2 == 1 }">
            <h2 class="full-width">
              {{ $t(`intensives.tracks[${i}].title`) }}
            </h2>
            <p class="full-width title-text">
              {{ $t(`intensives.tracks[${i}].instructors`) }}
            </p>
            <p class="full-width title-text">
              {{ $t(`intensives.tracks[${i}].level`) }}
            </p>
            <p v-for="(t, j) in track.description" :key="`${j}`">
              {{ $t(`intensives.tracks[${i}].description[${j}]`) }}
            </p>
          </div>
          <div class="image" :class="{ left: i % 2 == 1, right: i % 2 == 0 }">
            <div class="margin-0 flex-container">
              <img
                :src="$t(`intensives.tracks[${i}].imgSrc`)"
                :alt="$t(`intensives.tracks[${i}].instructors`)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  height: 100%;
  width: 100%;
}

.track-card {
  margin: 0 -2rem;
  padding: 2rem;
}

.background-accent {
  background-color: var(--accent-1);
}

.flex-reverse {
  background-color: var(--accent-1);
}

.left {
  margin-right: 2rem;
  text-align: left;
}

.right {
  margin-left: 2rem;
  text-align: right;
}

.text {
  flex-basis: 200%;
}

.image {
  flex-basis: 100%;
}

.title-text {
  margin-top: -1rem;
  font-weight: bold;
}

@media screen and (max-width: 650px) {
  .left,
  .right {
    margin: 1rem;
  }
}
</style>
