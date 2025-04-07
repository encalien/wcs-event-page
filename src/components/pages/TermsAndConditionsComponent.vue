<script lang="ts">
import messages from "../../i18n/en";

export default {
  props: { contentKey: String },
  data() {
    return {
      messages: messages as any,
    };
  },
};
</script>

<template>
  <section v-if="contentKey">
    <h1>{{ $t(`${contentKey}.pageTitle`) }}</h1>
    <template
      v-for="(content, topic) in messages[contentKey]"
      :key="`${topic}`"
    >
      <div class="topic" v-if="`${topic}` !== 'pageTitle'">
        <h3 v-if="messages[contentKey][topic].title">
          {{ $t(`${contentKey}.${topic}.title`) }}
        </h3>
        <div v-for="(paragraph, i) in content.infoText" :key="`${i}`">
          <p
            v-if="paragraph.html"
            v-html="$t(`${contentKey}.${topic}.infoText[${i}].html`)"
          ></p>
          <p v-else :class="{ 'margin-0': paragraph.list }">
            {{ $t(`${contentKey}.${topic}.infoText[${i}].value`) }}
          </p>
          <ul v-if="paragraph.list">
            <li v-for="(item, j) in paragraph.list" :key="`${j}`">
              {{ $t(`${contentKey}.${topic}.infoText[${i}].list[${j}]`) }}
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

.topic ul {
  margin-bottom: 1rem;
}
</style>
