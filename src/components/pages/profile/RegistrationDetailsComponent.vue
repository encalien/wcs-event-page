<script lang="ts">
import { DateTime } from "luxon";

export default {
  props: {
    registration: Object,
  },
  methods: {
    formatTimestamp(timestamp: string, showHour: boolean) {
      return DateTime.fromISO(timestamp, { setZone: true }).toFormat(
        showHour ? "dd.MM.yyyy HH:mm:ss" : "dd.MM.yyyy"
      );
    },
  },
};
</script>

<template>
  <div>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.status") }}:
      </span>
      <span class="grid-item important">
        {{
          $t(
            `userProfile.details.statusStage.${registration?.status.toLowerCase()}`
          )
        }}
      </span>
    </span>
  </div>
  <div class="registration-details">
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.id") }}:
      </span>
      <span class="grid-item">
        {{ registration?.id }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.receivedAt") }}:
      </span>
      <span class="grid-item">
        {{ formatTimestamp(registration?.received_at, true) }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.passType") }}:
      </span>
      <span class="grid-item">
        {{ registration?.pass_type.name }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.name") }}:
      </span>
      <span class="grid-item">
        {{ registration?.first_name }} {{ registration?.last_name }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.email") }}:
      </span>
      <span class="grid-item">
        {{ registration?.submitted_email || registration?.email }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.country") }}:
      </span>
      <span class="grid-item">
        {{ registration?.country }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.wsdc") }}:
      </span>
      <span class="grid-item">
        {{ registration?.wsdc_number ?? "-" }}
      </span>
    </span>
    <span class="grid-container grid-row">
      <span class="grid-item important">
        {{ $t("userProfile.details.role") }}:
      </span>
      <span class="grid-item">
        {{ registration?.role }}
      </span>
    </span>
    <span
      class="grid-container grid-row"
      v-if="registration?.pass_type.name === 'Full pass'"
    >
      <span class="grid-item important">
        {{ $t("userProfile.details.level") }}:
      </span>
      <span class="grid-item">
        {{ registration?.level }}
      </span>
    </span>
    <span
      class="grid-container grid-row"
      v-if="registration?.final_price != null"
    >
      <span class="grid-item important">
        {{ $t("userProfile.details.price") }}:
      </span>
      <span class="grid-item">{{ registration?.final_price }} EUR</span>
    </span>
    <span class="grid-container grid-row" v-if="registration?.final_price">
      <span class="grid-item important">
        {{ $t("userProfile.details.paid") }}:
      </span>
      <span class="grid-item">
        <span v-if="registration?.paid_at">
          {{ registration?.paid_amount }} EUR ({{
            formatTimestamp(registration?.paid_at, false)
          }})
        </span>
        <span v-else>{{ $t("userProfile.details.notPaid") }}</span>
      </span>
    </span>
  </div>
</template>
