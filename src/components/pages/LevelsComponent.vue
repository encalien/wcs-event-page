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
    <h1>{{ $t("workshops.levels.pageTitle") }}</h1>
    <h2 v-if="$store.state.lang !== 'fr'">
      <router-link :to="`/${$store.state.lang}/workshops/wsdc`">
        {{ $t("workshops.wsdc.pageTitle") }}
      </router-link>
    </h2>
    <div class="flex-container flex-container-column flex-gap">
      <div
        v-for="(level, i) in messages.workshops.levels.levels"
        class="flex-item flex-basis-100 margin-0"
        :key="`${i}`"
      >
        <h2>{{ $t(`workshops.levels.levels[${i}].title`) }}</h2>
        <p v-for="(p, j) in level.descriptionText" :key="`${j}`">
          {{ $t(`workshops.levels.levels[${i}].descriptionText[${j}]`) }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
