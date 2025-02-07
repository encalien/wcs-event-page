<script lang="ts">
import axios from "axios";
import { DateTime } from "luxon";
import type { RegistrationDTO } from "../../dto";

export default {
  data() {
    return {
      profile: [] as RegistrationDTO[],
      isLoading: true,
      error: "",
    };
  },
  methods: {
    async fetchProfile() {
      const hash = this.$route.params.hash;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}get-registrations/${hash}`
        );
        this.profile = response.data;
        console.log(this.profile);
      } catch (err) {
        this.error = "Failed to load profile.";
      } finally {
        this.isLoading = false;
      }
    },
    formatTimestamp(timestamp: string) {
      return DateTime.fromISO(timestamp, { setZone: true }).toFormat(
        "dd.MM.yyyy HH:mm:ss"
      );
    },
  },
  mounted() {
    this.fetchProfile();
  },
};
</script>

<template>
  <div>
    <h1>Your Registrations</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <template v-for="(registration, i) in profile" :key="{ i }">
        <div class="registration" :class="registration.status.toLowerCase()">
          <div>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.status") }}:
              </span>
              <span class="grid-item important">
                {{ registration.status.toUpperCase() }}
              </span>
            </span>
          </div>
          <div class="registration-details">
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.id") }}:
              </span>
              <span class="grid-item">
                {{ registration.id }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.receivedAt") }}:
              </span>
              <span class="grid-item">
                {{ formatTimestamp(registration.received_at) }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.name") }}:
              </span>
              <span class="grid-item">
                {{ registration.first_name }} {{ registration.last_name }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.email") }}:
              </span>
              <span class="grid-item">
                {{ registration.submitted_email }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.country") }}:
              </span>
              <span class="grid-item">
                {{ registration.country }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.wsdc") }}:
              </span>
              <span class="grid-item">
                {{ registration.wsdc_number }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.role") }}:
              </span>
              <span class="grid-item">
                {{ registration.role }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.passType") }}:
              </span>
              <span class="grid-item">
                {{ registration.pass_type }}
              </span>
            </span>
            <span
              class="grid-container grid-row"
              v-if="registration.pass_type != 'Party pass'"
            >
              <span class="grid-item important">
                {{ $t("userProfile.details.level") }}:
              </span>
              <span class="grid-item">
                {{ registration.level }}
              </span>
            </span>
            <span
              class="grid-container grid-row"
              v-if="registration.price != null"
            >
              <span class="grid-item important">
                {{ $t("userProfile.details.price") }}:
              </span>
              <span class="grid-item">{{ registration.price }} EUR</span>
            </span>
            <span
              class="grid-container grid-row"
              v-if="registration.price != null"
            >
              <span class="grid-item important">
                {{ $t("userProfile.details.paid") }}:
              </span>
              <span class="grid-item">
                <span v-if="registration.paid_amount">
                  {{ registration.paid_amount }} ({{ registration.paid_at }})
                </span>
                <span v-else>{{ $t("userProfile.details.notPaid") }}</span>
              </span>
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.grid-row.grid-container {
  grid-template-columns: 1fr 2fr !important;
  padding: 0;
}

.grid-item {
  padding: 0.5rem 1rem;
}

.registration {
  margin: auto;
  max-width: 600px;
  border: 3px solid black;
  border-radius: 1rem;
  margin: 1rem auto 2rem;
}

.registration-details {
  background-color: var(--white);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.important {
  color: var(--black) !important;
}

.received {
  background-color: var(--received);
  border-color: var(--received);
}

.waitlist {
  background-color: var(--waitlist);
  border-color: var(--waitlist);
}

.accepted {
  background-color: var(--accepted);
  border-color: var(--accepted);
}

.confirmed {
  background-color: var(--confirmed);
  border-color: var(--confirmed);
}

.other {
  background-color: var(--other);
  border-color: var(--other);
}
</style>
