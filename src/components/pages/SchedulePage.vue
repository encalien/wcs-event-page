<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
    };
  },
  methods: {
    getDayParts(title: string) {
      const match = title.match(/([A-Za-z]+),\s+([A-Za-z]+)\s+(\d+)/);

      if (!match) {
        return { weekday: "", month: "", day: "" };
      }

      return {
        weekday: match[1].toUpperCase(),
        month: match[2],
        day: match[3],
      };
    },
  },
};
</script>

<template>
  <section class="schedule-page">
    <header class="schedule-header">
      <h1>{{ $t("workshops.schedule.pageTitle") }}</h1>
      <p>{{ $t("workshops.schedule.description") }}</p>
    </header>

    <div class="schedule-section">
      <article
        v-for="(day, dayIndex) in messages.workshops.schedule.days"
        :key="dayIndex"
        class="day-card"
      >
        <div class="date-column">
          <div class="date-weekday">
            {{
              getDayParts($t(`workshops.schedule.days[${dayIndex}].title`))
                .weekday
            }}
          </div>
          <div class="date-number">
            {{
              getDayParts($t(`workshops.schedule.days[${dayIndex}].title`)).day
            }}
          </div>
          <div class="date-month">
            {{
              getDayParts($t(`workshops.schedule.days[${dayIndex}].title`))
                .month
            }}
          </div>
        </div>

        <div class="schedule-column">
          <div
            v-for="(slot, slotIndex) in day.slots"
            :key="`${dayIndex}-${slotIndex}`"
            class="schedule-row"
            :class="{
              'is-break': slot.items.some((item) => item.class === 'break'),
              'is-party': slot.items.some((item) => item.class === 'party'),
              'is-audition': slot.items.some(
                (item) => item.class === 'audition'
              ),
            }"
          >
            <div class="time-column" :class="{ empty: !slot.time }">
              {{ slot.time }}
            </div>

            <div class="event-column">
              <div v-if="slot.items.length > 1" class="event-grid">
                <div
                  v-for="(item, itemIndex) in slot.items"
                  :key="`${dayIndex}-${slotIndex}-${itemIndex}`"
                  class="event-block"
                  :class="item.class"
                >
                  <div class="event-topic">
                    {{
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].topic`
                      )
                    }}
                  </div>
                  <div
                    v-if="
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].description`
                      )
                    "
                    class="event-description"
                  >
                    {{
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].description`
                      )
                    }}
                  </div>
                </div>
              </div>

              <div v-else class="event-block" :class="slot.items[0].class">
                <div class="event-topic">
                  {{
                    $t(
                      `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[0].topic`
                    )
                  }}
                </div>
                <div
                  v-if="
                    $t(
                      `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[0].description`
                    )
                  "
                  class="event-description"
                >
                  {{
                    $t(
                      `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[0].description`
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <section class="level-section">
      <h2>{{ $t("workshops.level.title") }}</h2>
      <p v-for="(val, i) in messages.workshops.level.descriptionText" :key="i">
        {{ $t(`workshops.level.descriptionText[${i}]`) }}
      </p>
    </section>
  </section>
</template>

<style scoped>
.schedule-page {
  width: 100%;
  max-width: 100%;
  padding: 56px 24px 80px;
}

.schedule-header {
  max-width: 900px;
  margin: 0 auto 30px;
  text-align: center;
}

.schedule-header h1 {
  font-size: clamp(2.5rem, 4vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.04em;
  font-weight: 800;
  margin: 0;
  color: var(--color-text);
}

.schedule-header p {
  margin-top: 0.75rem;
  font-size: 1.05rem;
  color: rgba(24, 24, 24, 0.72);
}

.schedule-section {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.day-card {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  width: 100%;
  border: 1px solid rgba(159, 77, 29, 0.35);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
}

.date-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: rgba(250, 241, 233, 0.9);
  padding: 28px 18px 24px;
  border-right: 1px solid rgba(159, 77, 29, 0.2);
}

.date-weekday {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dark-1);
  line-height: 1.2;
}

.date-number {
  margin-top: 0.3rem;
  font-size: clamp(2.2rem, 2.7vw, 3rem);
  line-height: 1;
  font-weight: 800;
  color: var(--black-soft);
}

.date-month {
  margin-top: 0.4rem;
  font-size: 0.92rem;
  color: rgba(24, 24, 24, 0.7);
  line-height: 1.3;
}

.schedule-column {
  display: grid;
}

.schedule-row {
  display: grid;
  grid-template-columns: 145px minmax(0, 1fr);
  align-items: stretch;
  min-height: 0;
}

.schedule-row + .schedule-row {
  border-top: 1px solid rgba(159, 77, 29, 0.12);
}

.time-column {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 14px;
  font-size: 0.97rem;
  font-weight: 500;
  color: rgba(34, 34, 34, 0.8);
  white-space: nowrap;
}

.time-column.empty {
  visibility: hidden;
}

.event-column {
  padding: 12px 14px;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.event-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 78px;
  padding: 12px 14px;
  border-radius: 8px;
  background: rgba(245, 240, 233, 0.9);
  color: var(--black-soft);
}

.event-topic {
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
}

.event-description {
  margin-top: 0.2rem;
  font-size: 0.82rem;
  color: rgba(34, 34, 34, 0.72);
  line-height: 1.35;
}

.class {
  background: rgba(245, 240, 233, 0.9);
}

.audition {
  background: rgba(240, 240, 238, 0.9);
}

.break {
  background: rgba(240, 240, 238, 0.9);
  text-align: center;
  justify-content: center;
  align-items: center;
}

.break .event-description {
  display: none;
}

.party {
  background: var(--dark-2);
  color: var(--white);
}

.party .event-description {
  color: rgba(255, 255, 255, 0.82);
}

.is-break .time-column {
  visibility: hidden;
}

.is-break .event-column {
  padding-top: 12px;
  padding-bottom: 12px;
}

.is-party .event-block {
  min-height: 0;
  padding-top: 12px;
  padding-bottom: 12px;
}

.level-section {
  max-width: 800px;
  margin: 60px auto 0;
  text-align: center;
}

.level-section h2 {
  font-size: clamp(2rem, 3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.level-section p {
  margin: 0 0 1rem;
  text-align: left;
  line-height: 1.6;
  color: var(--color-text-soft);
}

@media (max-width: 820px) {
  .day-card {
    grid-template-columns: 120px minmax(0, 1fr);
  }

  .schedule-row {
    grid-template-columns: 115px minmax(0, 1fr);
  }

  .date-column {
    padding: 22px 14px 18px;
  }

  .time-column {
    font-size: 0.9rem;
  }
}

@media (max-width: 620px) {
  .schedule-page {
    padding: 48px 16px 72px;
  }

  .schedule-header {
    margin-bottom: 24px;
  }

  .day-card {
    display: block;
    border-radius: 8px;
  }

  .date-column {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 0.5rem;
    border-right: none;
    border-bottom: 1px solid rgba(159, 77, 29, 0.2);
    padding: 16px 18px;
  }

  .date-weekday,
  .date-number,
  .date-month {
    margin-top: 0;
  }

  .date-weekday {
    font-size: 0.7rem;
  }

  .date-number {
    font-size: 1.7rem;
  }

  .date-month {
    font-size: 0.9rem;
  }

  .schedule-column {
    padding: 0 0 10px;
  }

  .schedule-row {
    display: block;
    border-top: 1px solid rgba(159, 77, 29, 0.1);
  }

  .schedule-row + .schedule-row {
    border-top: 1px solid rgba(159, 77, 29, 0.1);
  }

  .time-column,
  .is-break .time-column,
  .time-column.empty {
    display: block;
    padding: 12px 18px 0;
    visibility: visible;
    font-weight: 600;
    color: rgba(34, 34, 34, 0.82);
  }

  .event-column {
    padding: 8px 18px 12px;
  }

  .event-grid {
    grid-template-columns: 1fr;
  }

  .event-block {
    min-height: 0;
  }

  .break {
    margin-top: 6px;
  }

  .level-section {
    margin-top: 48px;
  }
}
</style>
