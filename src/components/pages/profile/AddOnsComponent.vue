<script lang="ts">
import type {
  AddOnDTO,
  AddonSelectionDTO,
  RegistrationDTO,
} from "../../../dto";
import axios, { AxiosError } from "axios";
import messages from "../../../i18n/en";
import ModalComponent from "../../ModalComponent.vue";

export default {
  data() {
    return {
      eventId: import.meta.env.VITE_EVENT_ID,
      apiUrl: import.meta.env.VITE_API_URL,
      token: this.$route.params.hash,
      isLoading: true,
      error: "",
      fieldErrors: {} as Record<number | string, string>,
      formData: {} as AddonSelectionDTO,
      isFormEnabled: false,
      isSubmitting: false,
      messages: messages,
      addOnModal: null as string | null,
    };
  },
  props: {
    registration: Object as () => RegistrationDTO,
    availableAddOns: Array as () => AddOnDTO[],
  },
  components: { ModalComponent },
  emits: ["expired-token", "update-registration"],
  methods: {
    initializeFormData() {
      if (!this.registration || !this.availableAddOns) return;

      this.formData = {};

      this.availableAddOns.forEach((addOn: AddOnDTO) => {
        const reg_add_on = this.registration?.add_ons.find(
          (ra) => ra.add_on.id === addOn.id
        );
        this.formData[addOn.id] = {
          added: reg_add_on
            ? [1, 2, 3, 4, 5, 9].includes(reg_add_on.status)
            : false,
          options:
            reg_add_on && Object.keys(reg_add_on.options).length
              ? reg_add_on.options
              : {},
        };
      });
    },
    validateFieldSelections() {
      let isValid = true;

      for (const key in this.formData) {
        if (key === "id") continue;

        if (this.formData[key] == undefined) {
          this.fieldErrors[key] = "pleaseSelect";
          isValid = false;
        } else if (this.formData[key].added && this.availableAddOns) {
          const addOn = this.availableAddOns.find((a) => a.id === +key);

          if (addOn?.options.length) {
            for (const option of addOn.options) {
              if (this.formData[key].options[option.key] == undefined) {
                this.fieldErrors[option.key] = "pleaseSelect";
                isValid = false;
              }
            }
          }
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

        this.$emit("update-registration", updatedRegistration.data);

        this.isFormEnabled = false;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          this.$emit("expired-token");
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
    v-if="registration?.pass_type.name !== 'Zero to Hero'"
  >
    <span class="grid-container grid-row">
      <span class="grid-item important center-text" style="grid-column: span 2">
        {{ $t("userProfile.addons.title").toUpperCase() }}
      </span>
    </span>
    <div
      v-if="!availableAddOns"
      class="registration-update-form center-text"
      style="padding-bottom: 1rem"
    >
      {{ $t("userProfile.addons.title") }}{{ " " }}
      {{ $t("userProfile.loading").toLowerCase() }}...
    </div>
    <div
      v-if="availableAddOns && !availableAddOns.length"
      class="registration-update-form center-text"
      style="padding-bottom: 1rem"
    >
      {{ $t("userProfile.addons.noAddOnsAvailable") }}
    </div>

    <form
      v-if="availableAddOns?.length"
      @submit.prevent="() => saveAddOns()"
      class="registration-update-form"
    >
      <div v-for="addOn in availableAddOns" :key="addOn.id">
        <div class="grid-container grid-row">
          <div class="grid-item important flex-container">
            {{ $t(`userProfile.addons.${addOn.translate_key}.title`) }}
            <span
              v-if="(messages.userProfile.addons as any)[addOn.translate_key].infoModal"
            >
              <button
                type="button"
                class="btn btn-secondary"
                @click="addOnModal = addOn.translate_key"
              >
                {{
                  $t(
                    `userProfile.addons.${addOn.translate_key}.infoModal.title`
                  )
                }}
              </button>
            </span>
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
                  v-model="formData[addOn.id].added"
                  :id="addOn.translate_key + 'Yes'"
                  :name="addOn.translate_key"
                  :value="true"
                  :disabled="addOn.translate_key !== 'preparty'"
                />
                <label :for="addOn.translate_key + 'Yes'">
                  {{ $t("userProfile.form.yes") }}
                </label>
              </div>
              <div class="flex-item flex-container">
                <input
                  type="radio"
                  v-model="formData[addOn.id].added"
                  :id="addOn.translate_key + 'No'"
                  :name="addOn.translate_key"
                  :value="false"
                  :disabled="addOn.translate_key !== 'preparty'"
                />
                <label :for="addOn.translate_key + 'No'">
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
        <template v-if="addOn.options.length && formData[addOn.id].added">
          <div class="grid-container grid-row sub-form" v-if="!isFormEnabled">
            <div class="grid-item mobile-hidden"></div>
            <div class="grid-item flex-container">
              <div
                v-for="(option, i) in addOn.options"
                :key="i"
                class="flex-item"
              >
                {{
                  $t(
                    `userProfile.addons.${addOn.translate_key}.options.${option.key}`
                  )
                }}:
                {{
                  $t(
                    `userProfile.addons.${addOn.translate_key}.options.${
                      formData[addOn.id].options[option.key]
                    }`
                  )
                }}
              </div>
            </div>
          </div>
          <div class="grid-container grid-row sub-form" v-if="isFormEnabled">
            <div
              v-for="(option, i) in addOn.options"
              :key="i"
              class="grid-item flex-container flex-column"
            >
              <input
                v-if="!['select', 'radio'].includes(option.type)"
                :type="option.type"
                :placeholder="
                  $t(
                    `userProfile.addons.${addOn.translate_key}.options${option.key}`
                  )
                "
                :min="option.min"
                :max="option.max"
                v-model="formData[addOn.id].options[option.key]"
              />
              <fieldset
                v-if="option.type === 'radio'"
                class="grid-item flex-container flex-column"
              >
                <div class="flex-item flex-container">
                  <div
                    class="flex-item flex-container"
                    v-for="choice in option.choices"
                    :key="choice"
                  >
                    <input
                      type="radio"
                      v-model="formData[addOn.id].options[option.key]"
                      :id="option.key + '-' + choice"
                      :name="choice"
                      :value="choice"
                    />
                    <label :for="option.key + '-' + choice">
                      {{
                        $t(
                          `userProfile.addons.${addOn.translate_key}.options.${choice}`
                        )
                      }}
                    </label>
                  </div>
                </div>
              </fieldset>
              <select
                v-if="option.type === 'select'"
                v-model="formData[addOn.id].options[option.key]"
                class="grid-item"
              >
                <option disabled :value="undefined">
                  {{
                    $t(
                      `userProfile.addons.${addOn.translate_key}.options.${option.key}`
                    )
                  }}
                </option>
                <option
                  v-for="(choice, j) in option.choices"
                  :key="j"
                  :value="choice"
                >
                  {{
                    $t(
                      `userProfile.addons.${addOn.translate_key}.options.${choice}`
                    )
                  }}
                </option>
              </select>
              <!-- Error message under the sub-form -->
              <span v-if="fieldErrors?.[option.key]" class="field-error">
                {{ $t(`userProfile.form.${fieldErrors[option.key]}`) }}
              </span>
            </div>
          </div>
        </template>
        <div class="grid-item flex-container info">
          {{ $t(`userProfile.addons.${addOn.translate_key}.info`) }}
        </div>

        <ModalComponent
          v-if="addOnModal === addOn.translate_key"
          @close="addOnModal = null"
        >
          <div style="padding: 2rem 1rem">
            <h2 class="center-text">
              {{
                $t(`userProfile.addons.${addOn.translate_key}.infoModal.title`)
              }}
            </h2>
            <div
              v-for="meal in Object.keys((messages.userProfile.addons as any)[addOn.translate_key].infoModal?.meals)"
              :key="meal"
              style="margin: 0 0 2rem"
            >
              <h3>
                {{
                  $t(
                    `userProfile.addons.${addOn.translate_key}.options.${meal}`
                  )
                }}
              </h3>
              <div
                v-for="(mealOption, i) in (messages.userProfile.addons as any)[addOn.translate_key].infoModal?.meals[meal]"
                :key="i"
                style="margin: 1rem 0"
              >
                <span class="bold">
                  {{
                    $t(
                      `userProfile.addons.${addOn.translate_key}.infoModal.meals.${meal}[${i}].date`
                    )
                  }}
                </span>
                <ul>
                  <li>
                    <span class="important">
                      [{{
                        $t(
                          `userProfile.addons.${addOn.translate_key}.options.meat`
                        )
                      }}]
                    </span>
                    {{
                      $t(
                        `userProfile.addons.${addOn.translate_key}.infoModal.meals.${meal}[${i}].meat`
                      )
                    }}
                  </li>
                  <li>
                    <span class="important">
                      [{{
                        $t(
                          `userProfile.addons.${addOn.translate_key}.options.vegetarian`
                        )
                      }}]
                    </span>
                    {{
                      $t(
                        `userProfile.addons.${addOn.translate_key}.infoModal.meals.${meal}[${i}].veggie`
                      )
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="small">
              {{
                $t(`userProfile.addons.${addOn.translate_key}.infoModal.info`)
              }}
            </div>
          </div>
        </ModalComponent>
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

<style scoped lang="scss">
.sub-form {
  .grid-item.flex-container {
    flex-wrap: wrap;
    gap: 0;

    .flex-item {
      margin-right: 1rem;
    }

    &.flex-column {
      align-items: stretch;

      .grid-item {
        margin: 0.5rem 0;
        height: 2rem;

        &.flex-container.flex-column {
          align-items: flex-start;
          padding: 0;
        }
      }
    }
  }
}

.btn.btn-secondary {
  margin: 0 0 0.3rem;
  height: 2rem;
  font-size: unset;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.meal-package {
  margin: 1rem 0;
}

@media screen and (max-width: 730px) {
  .grid-container.grid-row {
    .grid-item.important.flex-container {
      align-items: center;
      justify-content: space-between;
    }
  }

  .grid-row.grid-container.sub-form {
    grid-template-columns: 1fr 1fr !important;
    padding: 0;
    margin-top: -0.8rem;

    .grid-item.flex-container {
      padding: 0.2rem 1rem;
    }

    .mobile-hidden {
      display: none;
    }
  }
}
</style>
