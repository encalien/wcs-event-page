<script lang="ts">
import axios, { AxiosError } from "axios";
import { DateTime } from "luxon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {
  AddOnDTO,
  AddonSelectionDTO,
  MerchItemDTO,
  RegistrationDTO,
} from "../../dto";

export default {
  data() {
    return {
      eventId: import.meta.env.VITE_EVENT_ID,
      apiUrl: import.meta.env.VITE_API_URL,
      token: this.$route.params.hash,
      userRegistrations: [] as RegistrationDTO[],
      availableAddOns: [] as AddOnDTO[],
      availableMerchItems: [] as MerchItemDTO[],
      isLoading: true,
      error: "",
      fieldErrors: {} as Record<number, Record<number, string>>,
      newRegistrationsSelections: [] as AddonSelectionDTO[],
      isFormEnabled: [] as boolean[],
      isSubmitting: false,
    };
  },
  methods: {
    async fetchData() {
      const headers = { Authorization: `Token ${this.token}` };

      try {
        const [registrationsRes, addOnsRes, merchRes] = await Promise.all([
          axios.get(`${this.apiUrl}events/${this.eventId}/registrations/`, {
            headers,
          }),
          axios.get(`${this.apiUrl}events/${this.eventId}/add-ons/`),
          axios.get(`${this.apiUrl}events/${this.eventId}/merch-items/`),
        ]);

        this.userRegistrations = registrationsRes.data;
        this.availableAddOns = addOnsRes.data;
        this.availableMerchItems = merchRes.data;

        for (const r of this.userRegistrations) {
          this.isFormEnabled.push(false);
          this.newRegistrationsSelections.push({
            id: r.id,
          });
        }
        this.availableAddOns.forEach((addOn) => {
          this.newRegistrationsSelections.forEach((r) => {
            r[addOn.id] = null;
          });
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          this.handleExpiredToken();
        } else {
          (window as any).alertComponent.show("errorRetrievingData", "error");
        }
      } finally {
        this.isLoading = false;
      }
    },
    async saveRegistration(registrationId: number) {
      if (!this.validateFieldSelections(registrationId)) return;
      this.fieldErrors = {};
      this.isLoading = true;
      try {
        const payload = this.newRegistrationsSelections.find(
          (r) => r.id === registrationId
        );

        const updatedRegistration = await axios.put(
          `${this.apiUrl}events/${this.eventId}/registrations/${registrationId}/`,
          payload,
          { headers: { Authorization: `Token ${this.token}` } }
        );

        const index = this.userRegistrations.findIndex(
          (r) => r.id === registrationId
        );

        this.userRegistrations[index] = updatedRegistration.data;

        this.isFormEnabled[registrationId] = false;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          this.handleExpiredToken();
        } else {
          (window as any).alertComponent.show("errorSavingSelection", "error");
        }
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleExpiredToken() {
      (window as any).alertComponent.show("expiredToken", "error");

      this.$router.push({
        path: `/${this.$store.state.lang}/profile/request-link`,
      });
    },
    formatTimestamp(timestamp: string, showHour: boolean) {
      return DateTime.fromISO(timestamp, { setZone: true }).toFormat(
        showHour ? "dd.MM.yyyy HH:mm:ss" : "dd.MM.yyyy"
      );
    },
    validateFieldSelections(registrationId: number) {
      let isValid = true;

      const selection = this.newRegistrationsSelections.find(
        (selection) => selection.id === registrationId
      );
      if (!selection) return false;

      for (const addOnId in selection) {
        if (addOnId === "id") continue;
        if (selection[addOnId] == undefined) {
          if (!this.fieldErrors[selection.id]) {
            this.fieldErrors[selection.id] = {};
          }
          this.fieldErrors[selection.id][addOnId] = "pleaseSelect";
          isValid = false;
        }
      }

      return isValid;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <div>
    <h1>{{ $t("userProfile.profilePageTitle") }}</h1>
    <p v-if="isLoading">{{ $t("userProfile.loading") }}...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <div
        v-if="!userRegistrations || !userRegistrations.length"
        style="margin-bottom: 20rem"
      >
        {{ $t("userProfile.details.noRegistrationFound") }}
      </div>
      <template v-for="(registration, i) in userRegistrations" :key="{ i }">
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
                {{ formatTimestamp(registration.received_at, true) }}
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
                {{ registration.submitted_email || registration.email }}
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
                {{ registration.wsdc_number ?? "-" }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.role") }}:
              </span>
              <span class="grid-item">
                {{
                  $t(`userProfile.details.${registration.role.toLowerCase()}`)
                }}
              </span>
            </span>
            <span class="grid-container grid-row">
              <span class="grid-item important">
                {{ $t("userProfile.details.passType") }}:
              </span>
              <span class="grid-item">
                {{ registration.pass_type.name }}
              </span>
            </span>
            <span
              class="grid-container grid-row"
              v-if="registration.pass_type.name === 'Full pass'"
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
                <span v-if="registration.paid_at">
                  {{ registration.paid_amount }} EUR ({{
                    formatTimestamp(registration.paid_at, false)
                  }})
                </span>
                <span v-else>{{ $t("userProfile.details.notPaid") }}</span>
              </span>
            </span>
          </div>

          <!-- Add-ons -->
          <div
            class="section-header"
            v-if="registration.pass_type.name !== 'Zero to Hero'"
          >
            <span class="grid-container grid-row">
              <span
                class="grid-item important center-text"
                style="grid-column: span 2"
              >
                {{ $t("userProfile.addons.title").toUpperCase() }}
              </span>
            </span>
            <form
              @submit.prevent="() => saveRegistration(registration.id)"
              class="registration-update-form"
            >
              <div v-for="addOn in availableAddOns" :key="addOn.id">
                <div class="grid-container grid-row">
                  <div class="grid-item important">
                    {{ $t(`userProfile.addons.${addOn.translate_key}.title`) }}
                  </div>
                  <div
                    class="grid-item flex-container"
                    v-if="!isFormEnabled[registration.id]"
                  >
                    {{
                      $t(
                        `userProfile.addons.status[${
                          registration.add_ons.find(
                            (ra) => ra.add_on.id === addOn.id
                          )?.status || 0
                        }]`
                      )
                    }}
                  </div>
                  <fieldset
                    v-if="isFormEnabled[registration.id]"
                    class="grid-item flex-container flex-column"
                  >
                    <div class="flex-item flex-container">
                      <div class="flex-item flex-container">
                        <input
                          type="radio"
                          v-model="newRegistrationsSelections[i][addOn.id]"
                          :id="addOn.translate_key + 'Yes' + i"
                          :name="addOn.translate_key"
                          :value="true"
                        />
                        <label :for="addOn.translate_key + 'Yes' + i">
                          {{ $t("userProfile.form.yes") }}
                        </label>
                      </div>
                      <div class="flex-item flex-container">
                        <input
                          type="radio"
                          v-model="newRegistrationsSelections[i][addOn.id]"
                          :id="addOn.translate_key + 'No' + i"
                          :name="addOn.translate_key"
                          :value="false"
                        />
                        <label :for="addOn.translate_key + 'No' + i">
                          {{ $t("userProfile.form.no") }}
                        </label>
                      </div>
                    </div>
                    <!-- Error message under the radio group -->
                    <span
                      v-if="fieldErrors[registration.id]?.[addOn.id]"
                      class="field-error"
                    >
                      {{
                        $t(
                          `userProfile.form.${
                            fieldErrors[registration.id][addOn.id]
                          }`
                        )
                      }}
                    </span>
                  </fieldset>
                </div>
                <div
                  class="grid-item flex-container"
                  style="margin-bottom: 1.5rem; font-size: small"
                >
                  <div>
                    {{ $t(`userProfile.addons.${addOn.translate_key}.info`) }}
                  </div>
                </div>
              </div>

              <!-- Form Controls -->
              <button
                v-if="isFormEnabled[registration.id]"
                type="submit"
                :disabled="isSubmitting"
                class="btn btn-primary"
              >
                {{ $t("userProfile.form.save") }}
              </button>
              <button
                v-if="!isFormEnabled[registration.id]"
                type="button"
                class="btn btn-primary"
                @click="isFormEnabled[registration.id] = true"
              >
                {{ $t("userProfile.form.edit") }}
              </button>
            </form>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.grid-row.grid-container {
  grid-template-columns: 1fr 1fr !important;
  padding: 0;
}

.grid-item {
  padding: 0.6rem 1rem;
}

.grid-item.sub-form {
  padding-left: 2.6rem;
}

.registration {
  margin: auto;
  max-width: 600px;
  border: 3px solid black;
  border-radius: 1rem;
  margin: 1rem auto 2rem;
}

.section-header {
  background-color: gainsboro;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.registration-details {
  padding: 0.5rem 0;
  background-color: var(--white);
}

.registration-details:last-child {
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.registration-update-form {
  padding: 1rem 0 0;
  width: 100%;
  max-width: none;
  margin: 0;
  background-color: var(--white);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  gap: 0.3rem;
}

.registration-update-form .grid-container.grid-row > .grid-item {
  padding: 0 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 2rem;
}

.flex-container {
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
}

.flex-container > .flex-item {
  flex: 0 0 content;
  padding: 0;
}

.flex-item.flex-container > .flex-item.flex-container {
  gap: 0.2rem;
}

.grid-item.flex-container.flex-column {
  justify-content: flex-start;
}

.flex-column {
  flex-direction: column;
  gap: 0;
}

.field-error {
  color: var(--accent-1);
  font-size: small;
  margin-top: -0.5rem;
}

select.grid-item,
input.grid-item {
  margin: 0.5rem 1rem;
  padding: 0.2rem 0.5rem;
  font-size: 16px;
}

fieldset {
  border: none;
}

.important {
  color: var(--black) !important;
}

.btn-primary {
  border: none;
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

.confirmed,
.paid {
  background-color: var(--confirmed);
  border-color: var(--confirmed);
}

.other {
  background-color: var(--other);
  border-color: var(--other);
}
</style>
