<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages,
    };
  },

  methods: {
    eventClasses(eventClass: string) {
      switch (eventClass) {
        case "party":
          return "bg-primary text-light";

        case "audition":
          return "bg-secondary text-light";

        case "class":
          return "bg-warning text-body";

        case "break":
          return "bg-body-tertiary text-body";

        default:
          return "bg-light text-body";
      }
    },
  },
};
</script>

<template>
  <section class="container py-4 py-lg-5">
    <!-- Header -->
    <header class="text-center mb-4 mb-lg-5">
      <h1 class="display-5 fw-bold mb-5 text-center">
        {{ $t("workshops.schedule.pageTitle") }}
      </h1>

      <p class="text-body-secondary mb-0">
        {{ $t("workshops.schedule.description") }}
      </p>
    </header>

    <!-- Schedule -->
    <div class="schedule mx-auto d-grid gap-4">
      <article
        v-for="(day, dayIndex) in messages.workshops.schedule.days"
        :key="dayIndex"
        class="day-card rounded-3 overflow-hidden"
      >
        <!-- Day -->
        <header class="day-heading bg-body-tertiary px-3 py-3">
          <div class="day-name fw-bold text-uppercase text-primary text-nowrap">
            {{
              day.date?.day ?? $t(`workshops.schedule.days[${dayIndex}].title`)
            }}
          </div>

          <div class="date-number fw-bold mt-2">
            {{ day.date?.dayNumber ?? "" }}
          </div>

          <div class="date-month text-body-secondary mt-1">
            {{ day.date?.month ?? "" }}
          </div>
        </header>

        <!-- Slots -->
        <div>
          <div
            v-for="(slot, slotIndex) in day.slots"
            :key="`${dayIndex}-${slotIndex}`"
            class="schedule-row"
            :class="{
              'schedule-row--break': slot.items.some(
                (item) => item.class === 'break'
              ),
            }"
          >
            <!-- Time -->
            <div
              class="time-column d-flex align-items-center px-3 py-2 text-body-secondary text-nowrap"
            >
              <span v-if="slot.time">
                {{ slot.time }}
              </span>
            </div>

            <!-- Events -->
            <div class="event-column px-2 py-1">
              <div
                :class="{
                  'event-grid': slot.items.length > 1,
                }"
              >
                <div
                  v-for="(item, itemIndex) in slot.items"
                  :key="`${dayIndex}-${slotIndex}-${itemIndex}`"
                  class="event-block rounded-3 px-3 py-2"
                  :class="[
                    eventClasses(item.class),
                    {
                      'd-flex align-items-center justify-content-center':
                        item.class === 'break',
                    },
                  ]"
                >
                  <div class="fw-bold lh-sm">
                    {{
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].topic`
                      )
                    }}
                  </div>

                  <div
                    v-if="
                      item.class !== 'break' &&
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].description`
                      )
                    "
                    class="small mt-1 event-description"
                  >
                    {{
                      $t(
                        `workshops.schedule.days[${dayIndex}].slots[${slotIndex}].items[${itemIndex}].description`
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Level -->
    <section class="mt-5">
      <h2 class="display-6 fw-bold text-center mb-4">
        {{ $t("workshops.level.title") }}
      </h2>

      <p
        v-for="(val, i) in messages.workshops.level.descriptionText"
        :key="i"
        class="mb-3 lh-lg"
      >
        {{ $t(`workshops.level.descriptionText[${i}]`) }}
      </p>
    </section>
  </section>
</template>

<style scoped>
/*
 * Only the timetable itself is deliberately narrower.
 * Header + level content use the full 1200px Bootstrap container.
 */
.schedule {
  max-width: 900px;
}

.day-card {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  border: 1px solid rgba(var(--bs-primary-rgb), 0.18);
}

.day-heading {
  min-width: 0;
  border-right: 1px solid rgba(var(--bs-primary-rgb), 0.1);
}

.day-name {
  font-size: 0.95rem;
  line-height: 1.15;
  letter-spacing: 0.04em;
}

.date-number {
  font-size: 2rem;
  line-height: 1;
}

.date-month {
  font-size: 0.8rem;
  line-height: 1.2;
}

.schedule-row {
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr);
}

.time-column {
  font-size: 0.82rem;
  font-weight: 500;
}

.event-column {
  min-width: 0;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.3rem;
}

.event-block {
  min-height: 54px;
}

.bg-primary .event-description,
.bg-secondary .event-description {
  color: rgba(var(--bs-light-rgb), 0.85);
}

.schedule-row--break .time-column {
  visibility: hidden;
}

/* Tablet */
@media (max-width: 991.98px) {
  .schedule {
    max-width: 820px;
  }

  .day-card {
    grid-template-columns: 140px minmax(0, 1fr);
  }

  .schedule-row {
    grid-template-columns: 120px minmax(0, 1fr);
  }

  .day-name {
    font-size: 0.9rem;
  }

  .date-number {
    font-size: 1.85rem;
  }

  .date-month {
    font-size: 0.76rem;
  }

  .time-column {
    font-size: 0.8rem;
  }
}

/* Mobile */
@media (max-width: 575.98px) {
  .schedule {
    max-width: none;
  }

  .day-card {
    display: block;
  }

  .day-heading {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "weekday number"
      "weekday month";
    align-items: center;
    column-gap: 0.5rem;
    border-right: 0;
    border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.1);
  }

  .day-name {
    grid-area: weekday;
    font-size: 1.05rem;
    white-space: normal !important;
  }

  .date-number {
    grid-area: number;
    margin-top: 0 !important;
    font-size: 1.4rem;
    text-align: right;
  }

  .date-month {
    grid-area: month;
    margin-top: 0 !important;
    font-size: 0.72rem;
    text-align: right;
  }

  .schedule-row {
    display: block;
  }

  .time-column {
    display: block !important;
    padding: 0.65rem 0.75rem 0.2rem !important;
    font-size: 0.78rem;
    font-weight: 600;
    visibility: visible;
  }

  .event-column {
    padding: 0.35rem 0.75rem 0.7rem !important;
  }

  .schedule-row--break .time-column {
    display: none !important;
  }

  .schedule-row--break .event-column {
    padding-top: 0.65rem !important;
  }

  .event-grid {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .event-block {
    min-height: 0;
  }
}
</style>
