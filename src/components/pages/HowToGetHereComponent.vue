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
  <section v-if="$store.state.lang !== 'si'" id="how-to-get-here">
    <h1>{{ $t("location.howToGetHere.pageTitle") }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item margin-0">
        <div
          v-for="(option, i) in messages.location.howToGetHere.options"
          :key="`${i}`"
        >
          <h3>{{ $t(`location.howToGetHere.options[${i}].title`) }}</h3>
          <p
            v-for="(p, j) in option.description"
            v-html="$t(`location.howToGetHere.options[${i}].description[${j}]`)"
            :key="`${j}`"
          ></p>
          <ul v-if="option.airports">
            <li v-for="(airport, j) in option.airports" :key="`${j}`">
              <span class="bold">{{
                $t(`location.howToGetHere.options[${i}].airports[${j}].name`)
              }}</span>
              -
              {{
                $t(
                  `location.howToGetHere.options[${i}].airports[${j}].distance`
                )
              }}<br />
              <span
                v-html="
                  $t(
                    `location.howToGetHere.options[${i}].airports[${j}].access`
                  )
                "
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
