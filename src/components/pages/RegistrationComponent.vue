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
    <h1>{{ $t("registration.pageTitle") }}</h1>
    <!-- <p>{{ $t("registration.opensSoonText") }}</p> -->
    <a
      href="https://forms.gle/3yyfug7jyT1uuk3i8"
      target="_blank"
      id="register-now-btn"
    >
      {{ $t("registration.registerNow") }}
    </a>

    <section>
      <p>{{ $t(`registration.registrationInfoTexts.pleaseReadText`) }}</p>
      <ul>
        <li
          v-for="(item, i) in messages.registration.registrationInfoTexts.links"
          :key="`${i}`"
        >
          <router-link :to="`/${$store.state.lang}/${item.urlPath}`">
            {{ $t(`registration.registrationInfoTexts.links[${i}].urlText`) }}
          </router-link>
        </li>
      </ul>
    </section>

    <section>
      <div
        v-for="(section, i) in messages.registration.instructions"
        :key="`${i}`"
      >
        <div
          v-if="
            $store.state.lang != 'si' ||
            i < messages.registration.instructions.length - 1
          "
        >
          <h3>{{ $t(`registration.instructions[${i}].title`) }}</h3>
          <div v-if="section.preTexts">
            <p v-for="(preText, j) in section.preTexts" :key="`${j}`">
              {{ $t(`registration.instructions[${i}].preTexts[${j}]`) }}
            </p>
          </div>
          <ul>
            <li v-for="(instruction, j) in section.textsList" :key="`${j}`">
              {{ $t(`registration.instructions[${i}].textsList[${j}]`) }}
            </li>
          </ul>
          <div v-if="section.postText">
            {{ $t(`registration.instructions[${i}].postText`) }}
          </div>

          <hr v-if="i < messages.registration.instructions.length - 1" />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
div + ul,
p + ul {
  margin-top: -1rem;
}

ul {
  margin-bottom: 1rem;
}

#register-now-btn {
  display: block;
  width: fit-content;
  margin: 2rem auto;
  padding: 1rem 3rem;
  color: var(--accent-2);
  background-color: var(--accent-1);
  font-family: "Cera Pro Bold";
  font-size: 2rem;
  text-transform: uppercase;
}

#register-now-btn:hover {
  background-color: #f06d62;
  text-decoration: none;
}
</style>
