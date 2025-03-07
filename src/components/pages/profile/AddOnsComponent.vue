<script lang="ts">
import type {
  AddOnDTO,
  AddonSelectionDTO,
  RegistrationDTO,
} from "../../../dto";
import axios, { AxiosError } from "axios";

export default {
  data() {
    return {
      eventId: import.meta.env.VITE_EVENT_ID,
      apiUrl: import.meta.env.VITE_API_URL,
      token: this.$route.params.hash,
      isLoading: true,
      error: "",
      fieldErrors: {} as Record<number, string>,
      formData: {} as AddonSelectionDTO,
      isFormEnabled: false,
      isSubmitting: false,
    };
  },
  props: {
    registration: Object as () => RegistrationDTO,
    availableAddOns: Array as () => AddOnDTO[],
  },
  methods: {
    initializeFormData() {
      if (!this.registration || !this.availableAddOns) return;

      this.formData = { id: this.registration.id };

      this.availableAddOns.forEach((addOn: AddOnDTO) => {
        this.formData[addOn.id] = null;
      });
    },
    validateFieldSelections() {
      let isValid = true;

      for (const key in this.formData) {
        if (key === "id") continue;

        if (this.formData[key] == undefined) {
          this.fieldErrors[key] = "pleaseSelect";
          isValid = false;
        }
      }

      return isValid;
    },
    async saveAddOns() {
      if (!this.validateFieldSelections() || !this.registration) return;

      this.fieldErrors = {};
      this.isLoading = true;

      try {
        const updatedRegistration = await axios.put(
          `${this.apiUrl}events/${this.eventId}/registrations/${this.registration.id}/`,
          this.formData,
          { headers: { Authorization: `Token ${this.token}` } }
        );

        this.$emit("updateRegistration", updatedRegistration.data);

        this.isFormEnabled = false;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          this.$emit("expiredToken");
        } else {
          (window as any).alertComponent.show("errorSavingSelection", "error");
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    registration: {
      handler() {
        if (this.registration && this.availableAddOns) {
          this.initializeFormData();
        }
      },
      immediate: true,
    },
    availableAddOns: {
      handler() {
        if (this.registration && this.availableAddOns) {
          this.initializeFormData();
        }
      },
      immediate: true,
    },
  },
};
</script>

<template v-if="registration">
  <div
    class="section-header"
    v-if="
      registration?.pass_type.name !== 'Zero to Hero' && availableAddOns?.length
    "
  >
    <span class="grid-container grid-row">
      <span class="grid-item important center-text" style="grid-column: span 2">
        {{ $t("userProfile.addons.title").toUpperCase() }}
      </span>
    </span>
    <form @submit.prevent="() => saveAddOns()" class="registration-update-form">
      <div v-for="addOn in availableAddOns" :key="addOn.id">
        <div class="grid-container grid-row">
          <div class="grid-item important">
            {{ $t(`userProfile.addons.${addOn.translate_key}.title`) }}
          </div>
          <div class="grid-item flex-container" v-if="!isFormEnabled">
            {{
              $t(
                `userProfile.addons.status[${
                  registration?.add_ons.find(
                    (ra: any) => ra.add_on.id === addOn.id
                  )?.status || 0
                }]`
              )
            }}
          </div>
          <fieldset
            v-if="isFormEnabled"
            class="grid-item flex-container flex-column"
          >
            <div class="flex-item flex-container">
              <div class="flex-item flex-container">
                <input
                  type="radio"
                  v-model="formData[addOn.id]"
                  :id="addOn.translate_key + 'Yes' + registration?.id"
                  :name="addOn.translate_key"
                  :value="true"
                />
                <label :for="addOn.translate_key + 'Yes' + registration?.id">
                  {{ $t("userProfile.form.yes") }}
                </label>
              </div>
              <div class="flex-item flex-container">
                <input
                  type="radio"
                  v-model="formData[addOn.id]"
                  :id="addOn.translate_key + 'No' + registration?.id"
                  :name="addOn.translate_key"
                  :value="false"
                />
                <label :for="addOn.translate_key + 'No' + registration?.id">
                  {{ $t("userProfile.form.no") }}
                </label>
              </div>
            </div>
            <!-- Error message under the radio group -->
            <span v-if="fieldErrors?.[addOn.id]" class="field-error">
              {{ $t(`userProfile.form.${fieldErrors[addOn.id]}`) }}
            </span>
          </fieldset>
        </div>
        <div class="grid-item flex-container info">
          {{ $t(`userProfile.addons.${addOn.translate_key}.info`) }}
        </div>
      </div>

      <!-- Form Controls -->
      <button
        v-if="isFormEnabled"
        type="submit"
        :disabled="isSubmitting"
        class="btn btn-primary"
      >
        {{ $t("userProfile.form.save") }}
      </button>
      <button
        v-if="!isFormEnabled"
        type="button"
        class="btn btn-primary"
        @click="isFormEnabled = true"
      >
        {{ $t("userProfile.form.edit") }}
      </button>
    </form>
  </div>
</template>
