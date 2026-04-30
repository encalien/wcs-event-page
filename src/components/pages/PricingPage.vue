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
    <h1>{{ $t("workshops.pricing.pageTitle") }}</h1>
    <p v-for="(val, i) in messages.workshops.pricing.description" :key="i">
      {{ $t(`workshops.pricing.description[${i}]`) }}
    </p>

    <div id="passes">
      <h3 style="text-align: left">
        {{ $t("workshops.pricing.passInfo.title") }}
      </h3>
      <div class="flex-container">
        <div>
          {{ $t("workshops.pricing.passInfo.includesText") }}
          <ul>
            <li
              v-for="(val, i) in messages.workshops.pricing.passInfo.includes"
              :key="i"
            >
              {{ $t(`workshops.pricing.passInfo.includes[${i}]`) }}
            </li>
          </ul>
        </div>
        <div
          v-for="(val, i) in messages.workshops.pricing.priceTiers"
          :key="i"
          class="center-text"
        >
          <div style="font-weight: bold; margin-bottom: 1rem">
            {{ $t(`workshops.pricing.priceTiers[${i}].title`) }}
          </div>
          <h2 style="font-weight: bold">
            {{ $t(`workshops.pricing.priceTiers[${i}].price`) }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#passes {
  justify-content: space-between;
  gap: 2rem;
  margin-top: 4rem;
}

.flex-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: start;
  gap: 6rem;
}

@media screen and (max-width: 900px) {
  #passes {
    flex-direction: column;
    align-items: center;
  }

  .pass {
    flex: none;
    width: 70%;
  }
}

@media screen and (max-width: 650px) {
  .pass {
    flex: none;
    width: 100%;
  }
}
</style>
