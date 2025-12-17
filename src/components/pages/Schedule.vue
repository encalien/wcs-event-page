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
    <h1>{{ $t("workshops.schedule.pageTitle") }}</h1>
    <p>{{ $t("workshops.schedule.description") }}</p>
    <div id="schedule-table" class="grid-container">
      <div
        v-for="(val, i) in messages.workshops.schedule.days"
        :key="i"
        class="grid-container grid-gap"
      >
        <h3 class="grid-row grid-container">
          <span></span>
          {{ $t(`workshops.schedule.days[${i}].title`) }}
        </h3>
        <div
          v-for="(val, j) in messages.workshops.schedule.days[i].slots"
          class="grid-row grid-container"
          :key="j"
        >
          <div class="grid-row mobile-small">
            {{ $t(`workshops.schedule.days[${i}].slots[${j}].time`) }}
          </div>
          <div
            class="grid-row"
            style="gap: 0.5rem; display: flex; justify-content: stretch"
          >
            <div
              v-for="(item, k) in messages.workshops.schedule.days[i].slots[j]
                .items"
              :key="k"
              class="grid-row"
              style="font-weight: bold"
              :class="
                $t(
                  `workshops.schedule.days[${i}].slots[${j}].items[${k}].class`
                )
              "
            >
              {{
                $t(
                  `workshops.schedule.days[${i}].slots[${j}].items[${k}].topic`
                )
              }}<br />
              <small>{{
                $t(
                  `workshops.schedule.days[${i}].slots[${j}].items[${k}].description`
                )
              }}</small>
            </div>
          </div>
        </div>
        <!-- <hr> -->
      </div>
    </div>
  </section>
  <section>
    <h1>{{ $t("workshops.level.title") }}</h1>
    <p v-for="(val, i) in messages.workshops.level.descriptionText" :key="i">
      {{ $t(`workshops.level.descriptionText[${i}]`) }}
    </p>
  </section>
</template>

<style scoped>
#schedule-table {
  width: 60%;
  margin: 2rem auto;
  border: 2px solid var(--color-background-alt);
  border-radius: 2px;
  padding-bottom: 1rem;
}

.grid-row {
  padding: 0;
}

h3.grid-row {
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 0;
}

.grid-row.class,
.grid-row.party,
.grid-row.break,
.grid-row.audition {
  flex-basis: 100%;
  text-align: center;
  padding: 0.5rem 0.7rem;
}

.grid-row.mobile-small {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.class {
  background-color: var(--accent-1);
  color: var(--black-soft);
}

.party {
  background-color: var(--accent-2);
  color: var(--black-soft);
}

.audition {
  background-color: var(--accent-3);
  color: var(--light);
}

@media screen and (max-width: 1024px) {
  #schedule-table {
    width: 100%;
  }

  .mobile-small {
    font-size: 0.8rem;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
