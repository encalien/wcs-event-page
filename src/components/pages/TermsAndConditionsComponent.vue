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
    <template v-for="(content, topic) in messages.termsAndConditions">
      <div class="topic" v-if="`${topic}` !== 'pageTitle'" :key="topic">
        <h3>{{ $t(`termsAndConditions.${topic}.title`) }}</h3>
        <div
          v-for="(paragraph, paragraphIndex) in content.infoText"
          :key="paragraphIndex"
        >
          <p :class="{ 'margin-0': paragraph.list }">
            {{
              $t(
                `termsAndConditions.${topic}.infoText[${paragraphIndex}].value`
              )
            }}
          </p>
          <ul v-if="paragraph.list">
            <li v-for="(item, index) in paragraph.list" :key="index">
              {{
                $t(
                  `termsAndConditions.${topic}.infoText[${paragraphIndex}].list[${index}]`
                )
              }}
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
