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
    <h1>{{ $t("workshops.wsdc.pageTitle") }}</h1>
    <div>
      <div
        v-for="(faq, i) in messages.workshops.wsdc.faq"
        class="faq-item"
        :key="`${i}`"
      >
        <h2>{{ $t(`workshops.wsdc.faq[${i}].question`) }}</h2>
        <div v-for="(answerText, j) in faq.answerText" :key="`${j}`">
          <span v-html="$t(`workshops.wsdc.faq[${i}].answerText[${j}]`)"></span>
          <ul v-if="faq.list && answerText[answerText.length - 1] === ':'">
            <li v-for="(item, k) in faq.list" :key="`${k}`">
              <span v-html="$t(`workshops.wsdc.faq[${i}].list[${k}]`)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h2 {
  text-align: left;
}

.important {
  color: var(--black);
}

.faq-item {
  margin: 3rem 0;
}
</style>
