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
    <h1>{{ $t("workshops.staff.pageTitle") }}</h1>
    <div
      v-for="(teacher, t) in messages.workshops.staff.teachers"
      :key="t"
      style="margin-bottom: 2rem"
    >
      <div
        class="flex-container flex-gap"
        :class="t % 2 == 1 ? 'reverse-row' : ''"
      >
        <div
          v-if="messages.workshops.staff.teachers[t].src"
          class="flex-item flex-basis-50 margin-0 flex-container flex-container-column"
        >
          <img
            :src="$t(`workshops.staff.teachers[${t}].src`)"
            :alt="$t(`workshops.staff.teachers[${t}].names`)"
          />
        </div>
        <div class="flex-item flex-basis-50 margin-0">
          <h2 v-if="messages.workshops.staff.teachers[t].names">
            {{ $t(`workshops.staff.teachers[${t}].names`) }}
          </h2>
          <p v-for="(val, i) in teacher.description" :key="i">
            {{ $t(`workshops.staff.teachers[${t}].description[${i}]`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  width: 100%;
}

.flex-container-column {
  gap: 1rem;
}

.flex-basis-100 {
  flex-basis: 100%;
}

.reverse-row {
  flex-direction: row-reverse;
}
</style>
