<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages as any,
    };
  },
};
</script>

<template>
  <section>
    <h1>{{ $t("termsAndConditions.pageTitle") }}</h1>
    <template
      v-for="(content, topic) in messages.termsAndConditions"
      :key="`${topic}`"
    >
      <div class="topic" v-if="`${topic}` !== 'pageTitle'">
        <h3>{{ $t(`termsAndConditions.${topic}.title`) }}</h3>
        <div v-for="(paragraph, i) in content.infoText" :key="`${i}`">
          <p :class="{ 'margin-0': paragraph.list }">
            {{ $t(`termsAndConditions.${topic}.infoText[${i}].value`) }}
          </p>
          <ul v-if="paragraph.list">
            <li v-for="(item, j) in paragraph.list" :key="`${j}`">
              {{ $t(`termsAndConditions.${topic}.infoText[${i}].list[${j}]`) }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.topic {
  margin-top: 2rem;
  text-align: left;
}

.topic > h3 {
  text-align: left;
}
</style>
