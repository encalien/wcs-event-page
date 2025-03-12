<script lang="ts">
import axios, { AxiosError } from "axios";
import type {
  MerchItemDTO,
  MerchItemOrderDTO,
  MerchItemSelectionDTO,
  RegistrationDTO,
} from "../../../dto";

export default {
  data() {
    return {
      orderedItems: [] as MerchItemOrderDTO[],
      formData: {} as MerchItemSelectionDTO,
      newItem: {} as Record<number, { size: string; quantity: number }>,
      isFormEnabled: false,
      isSubmitting: false,
      fieldErrors: {} as Record<number, string>,
      selectedImage: null as string | null,
    };
  },
  props: {
    registration: Object as () => RegistrationDTO,
    availableMerchItems: Array as () => MerchItemDTO[],
  },
  emits: ["expired-token", "update-registration"],

  methods: {
    initializeFormData() {
      if (!this.registration || !this.availableMerchItems) return;

      this.orderedItems = this.registration.merch_items;
      this.formData = {};
      this.newItem = {};

      for (const item of this.availableMerchItems) {
        this.formData[item.id] = {};
        this.newItem[item.id] = { size: "", quantity: 0 };
        for (const size of item.available_sizes) {
          this.formData[item.id][size] =
            this.orderedItems.find(
              (i: MerchItemOrderDTO) =>
                i.merch_item.id === item.id && i.size === size
            )?.quantity ?? 0;
        }
      }
    },
    async addItemToOrder(merchItem: MerchItemDTO) {
      const size = this.newItem[merchItem.id].size;
      const quantity = this.newItem[merchItem.id].quantity;

      if (quantity === 0 || !size) {
        this.fieldErrors[merchItem.id] = "pleaseSelect";
        return;
      }
      this.fieldErrors[merchItem.id] = "";

      this.isFormEnabled = false;
      this.isSubmitting = true;

      const order: MerchItemSelectionDTO = {};

      for (const merchItemId in this.formData) {
        order[merchItemId] = {};
        for (const size in this.formData[merchItemId]) {
          order[merchItemId][size] = this.formData[merchItemId][size];
        }
      }

      order[merchItem.id][size] += quantity;

      await this.saveMerchItems(order);

      this.newItem[merchItem.id] = { size: "", quantity: 0 };
    },
    async saveMerchItems(order: MerchItemSelectionDTO) {
      try {
        const updatedRegistration = await axios.put(
          `${import.meta.env.VITE_API_URL}events/${
            import.meta.env.VITE_EVENT_ID
          }/registrations/${this.registration?.id}/order`,
          order,
          { headers: { Authorization: `Token ${this.$route.params.hash}` } }
        );

        this.$emit("update-registration", updatedRegistration.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          this.$emit("expired-token");
        } else {
          (window as any).alertComponent.show("errorSavingSelection", "error");
        }
      } finally {
        this.isSubmitting = false;
      }
    },
    getImageUrl(merchItem: MerchItemDTO) {
      return `/images/merch_${merchItem.translate_key.toLowerCase()}_${merchItem.model
        .toLowerCase()
        .replace(/ /g, "_")}.png`;
    },
    openModal(imageUrl: string) {
      this.selectedImage = imageUrl;
      document.addEventListener("keydown", this.closeOnEscape);
    },
    closeModal() {
      this.selectedImage = null;
      document.removeEventListener("keydown", this.closeOnEscape);
    },
    closeOnEscape(event: any) {
      if (event.key === "Escape") this.closeModal();
    },
    removeItemFromOrder(item: MerchItemOrderDTO) {
      this.isSubmitting = true;

      this.formData[item.merch_item.id][item.size] = 0;

      this.saveMerchItems(this.formData);
    },
  },
  watch: {
    registration: {
      handler() {
        if (this.registration && this.availableMerchItems) {
          this.initializeFormData();
        }
      },
      immediate: true,
    },
    availableMerchItems: {
      handler() {
        if (this.registration && this.availableMerchItems) {
          this.initializeFormData();
        }
      },
      immediate: true,
    },
  },
};
</script>

<template v-if="registration">
  <div v-if="!availableMerchItems">
    {{ $t("userProfile.merchItems.title") }}{{ " " }}
    {{ $t("userProfile.loading").toLowerCase() }}...
  </div>
  <div v-if="availableMerchItems && !availableMerchItems.length">
    {{ $t("userProfile.noMerchItemsAvailable") }}
  </div>

  <div class="section-header" v-if="availableMerchItems?.length">
    <span class="grid-container grid-row">
      <span class="grid-item important center-text" style="grid-column: span 2">
        {{ $t("userProfile.merchItems.title").toUpperCase() }}
      </span>
    </span>
    <form
      class="registration-update-form"
      novalidate
      @submit.prevent="() => {}"
    >
      <!-- Ordered Items -->
      <span class="important center-text">
        {{ $t("userProfile.merchItems.orderedItems") }}
      </span>
      <div v-if="orderedItems?.length">
        <div
          v-for="(item, i) in orderedItems"
          :key="i"
          class="grid-container grid-row"
        >
          <div class="grid-item flex-container">
            <img
              :src="getImageUrl(item.merch_item)"
              :alt="item.merch_item.model"
              class="thumbnail"
              @click="openModal(getImageUrl(item.merch_item))"
            />
            <span>
              {{
                $t(
                  `userProfile.merchItems.${item.merch_item.translate_key}.title`
                )
              }}: {{ " " }}
              <span class="important">
                {{ item.merch_item.model.toUpperCase() }}
              </span>
            </span>
          </div>
          <div class="grid-item grid-container grid-row">
            <span class="grid-item">
              {{ $t("userProfile.merchItems.size") }}: {{ item.size }}
            </span>
            <span class="grid-item"
              >{{ $t("userProfile.merchItems.quantity") }}:
              {{ item.quantity }}</span
            >
            <button
              class="grid-item btn btn-secondary"
              @click="removeItemFromOrder(item)"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
        </div>
      </div>
      <div v-else class="center-text">
        {{ $t("userProfile.merchItems.noItems") }}
      </div>

      <!-- Availble Items -->
      <span class="important center-text">
        {{ $t("userProfile.merchItems.availableItems") }}
      </span>
      <div v-if="availableMerchItems?.length">
        <div class="grid-item flex-container info">
          {{ $t(`userProfile.merchItems.info`) }}
        </div>
        <div v-for="merchItem in availableMerchItems" :key="merchItem.id">
          <div class="grid-container grid-row">
            <div class="grid-item flex-container">
              <img
                :src="getImageUrl(merchItem)"
                :alt="merchItem.model"
                class="thumbnail"
                @click="openModal(getImageUrl(merchItem))"
              />
              <span>
                {{
                  $t(`userProfile.merchItems.${merchItem.translate_key}.title`)
                }}: {{ " " }}
                <span class="important">
                  {{ merchItem.model.toUpperCase() }}
                </span>
              </span>
            </div>
            <fieldset class="grid-item grid-container grid-row">
              <select v-model="newItem[merchItem.id].size" class="grid-item">
                <option disabled value="">
                  {{ $t("userProfile.merchItems.size") }}
                </option>
                <option v-for="size in merchItem.available_sizes" :key="size">
                  {{ size }}
                </option>
              </select>
              <input
                class="grid-item"
                type="number"
                v-model.number="newItem[merchItem.id].quantity"
                min="1"
                :placeholder="$t('userProfile.merchItems.quantity')"
              />
              <button
                class="grid-item btn btn-secondary"
                @click="addItemToOrder(merchItem)"
              >
                <font-awesome-icon icon="fa-solid fa-plus" />
              </button>
              <!-- Error message under the merch item group -->
            </fieldset>
            <span class="grid-item"></span>
            <span
              v-if="fieldErrors?.[merchItem.id]"
              class="grid-item field-error"
            >
              {{ $t(`userProfile.form.${fieldErrors[merchItem.id]}`) }}
            </span>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- Modal -->
  <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">✕</button>
      <img :src="selectedImage" class="full-image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.important {
  color: var(--black);
  &.center-text {
    margin-top: 0.6rem;
  }
}

.registration-update-form {
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding-bottom: 1rem;

  .grid-container.grid-row {
    align-items: center;

    .grid-item {
      &.flex-container {
        align-items: flex-start;

        .thumbnail {
          height: 2rem;
          cursor: zoom-in;
        }
      }

      &.grid-container {
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        &.grid-row {
          grid-template-columns: 3fr 3fr 1fr !important;
          gap: 1rem;
          margin: 0.2rem 0;

          > .grid-item {
            padding: 0;
            width: 100%;
          }

          select.grid-item,
          input.grid-item {
            height: 2rem;
            width: 100%;
            padding: 0.2rem !important;
            margin: 0 !important;
          }

          .btn.btn-secondary {
            margin: 0.2rem 0;
            width: 3rem;
            height: 2rem;
            font-size: unset;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
          }

          .field-error {
            grid-column: span 2;
          }
        }
      }
    }
  }

  .flex-container > .flex-item {
    flex: 1 0 auto;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .modal-content {
    position: relative;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    .full-image {
      max-width: 90vw;
      max-height: 80vh;
      border-radius: 4px;
    }

    .close-btn {
      width: 1.6rem;
      height: 1.6rem;
      position: absolute;
      z-index: 10;
      right: 1rem;
      top: 1rem;
    }
  }
}
</style>
