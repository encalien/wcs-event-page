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
  <section id="slovenia">
    <h1>{{ $t("location.slovenia.pageTitle") }}</h1>
    <div class="flex-container flex-gap">
      <div>
        <div
          v-for="(desc, i) in messages.location.slovenia.description"
          :key="`desc${i}`"
          class="flex-container flex-gap"
          :class="{ 'flex-reverse': i % 2 == 1 }"
        >
          <div>
            <p v-for="(text, j) in desc.texts" :key="`desc${j}`">
              {{ $t(`location.slovenia.description[${i}].texts[${j}]`) }}
            </p>
          </div>
          <img
            :src="$t(`location.slovenia.description[${i}].src`)"
            :alt="$t(`location.slovenia.description[${i}].alt`)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flex-container {
  margin: 2rem auto;
  align-items: center;
}

img {
  max-width: 400px;
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
