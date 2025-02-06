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
  <section id="day-trip">
    <h1>{{ $t("dayTrip.pageTitle") }}</h1>
    <div class="flex-container flex-container-column flex-gap">
      <div
        v-for="(desc, i) in messages.dayTrip.description"
        :key="`${i}`"
        class="flex-container flex-gap"
        :class="{ 'flex-reverse': i % 2 == 1 }"
      >
        <div>
          <p v-for="(text, j) in desc.texts" :key="`${j}`">
            {{ $t(`dayTrip.description[${i}].texts[${j}]`) }}
          </p>
          <ul v-if="desc.itinerary">
            <li
              v-for="(item, k) in desc.itinerary"
              :key="`${k}`"
              class="grid-container"
            >
              <span class="bold">{{
                $t(`dayTrip.description[${i}].itinerary[${k}][0]`)
              }}</span>
              <span>{{
                $t(`dayTrip.description[${i}].itinerary[${k}][1]`)
              }}</span>
            </li>
          </ul>
        </div>
        <img
          v-if="desc.src"
          :src="$t(`dayTrip.description[${i}].src`)"
          :alt="$t(`dayTrip.description[${i}].alt`)"
        />
      </div>
      <!-- <a
        href="https://forms.gle/5rLsXo6aH7uMghEZ7"
        target="_blank"
        class="btn btn-primary"
      >
        {{ $t("registration.registerNow") }}
      </a> -->
    </div>
  </section>
</template>

<style scoped>
ul {
  padding: 0;
}

img {
  max-width: 400px;
}

.bold {
  font-weight: bold;
}

.flex-container {
  align-items: center;
}

.flex-container-column {
  margin: 2rem auto;
  align-items: center;
}

.grid-container {
  grid-template-columns: 5rem auto;
}

@media screen and (max-width: 1200px) {
  .flex-container {
    flex-direction: column;
  }

  img {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 650px) {
  img {
    max-width: calc(100vw - 2rem);
  }

  .flex-gap {
    gap: 1rem;
  }
}
</style>
