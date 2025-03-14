<script lang="ts">
import axios, { AxiosError } from "axios";
import type { AddOnDTO, MerchItemDTO, RegistrationDTO } from "../../../dto";
import AddOnsComponent from "./AddOnsComponent.vue";
import RegistrationDetailsComponent from "./RegistrationDetailsComponent.vue";
import MerchItemsComponent from "./MerchItemsComponent.vue";

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
    };
  },
  components: {
    AddOnsComponent,
    RegistrationDetailsComponent,
    MerchItemsComponent,
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
    handleExpiredToken() {
      (window as any).alertComponent.show("expiredToken", "error");

      this.$router.push({
        path: `/${this.$store.state.lang}/profile/request-link`,
      });
    },
    setRegistration(updatedRegistration: RegistrationDTO) {
      console.log(updatedRegistration);
      const i = this.userRegistrations.findIndex(
        (r) => r.id === updatedRegistration.id
      );
      this.userRegistrations[i] = updatedRegistration;
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
      <div v-for="(registration, i) in userRegistrations" :key="i">
        <div class="registration" :class="registration.status.toLowerCase()">
          <RegistrationDetailsComponent :registration="registration" />
          <AddOnsComponent
            :registration="registration"
            :availableAddOns="availableAddOns"
            @expired-token="handleExpiredToken"
            @update-registration="
              (updatedRegistration) => setRegistration(updatedRegistration)
            "
          />
          <MerchItemsComponent
            :registration="registration"
            :availableMerchItems="availableMerchItems"
            @expired-token="handleExpiredToken"
            @update-registration="
              (updatedRegistration) => setRegistration(updatedRegistration)
            "
          />
        </div>
      </div>
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
  max-width: 650px;
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
  line-height: normal;
  margin-bottom: 0.6rem;
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

<style scoped>
:deep(.grid-item.important) {
  color: var(--black) !important;
}

:deep(.info) {
  margin-bottom: 1.5rem;
  font-size: small;
}

@media screen and (max-width: 730px) {
  :deep(.grid-row.grid-container) {
    grid-template-columns: 1fr !important;
    padding: 0.6rem 1rem;
  }

  :deep(.grid-item) {
    padding: 0;
  }

  :deep(.info) {
    margin: 0;
    padding: 0 1rem 0.6rem;
  }

  :deep(.flex-container) {
    flex-direction: row;
  }

  :deep(.registration-update-form .grid-container.grid-row > .grid-item) {
    padding: 0;
    line-height: 1.6;
  }

  :deep(.field-error) {
    margin: 0;
  }
}
</style>
