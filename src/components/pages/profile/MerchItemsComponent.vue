<script lang="ts">
import axios, { AxiosError } from "axios";
import ModalComponent from "../../ModalComponent.vue";
import type {
  MerchItemDTO,
  MerchItemOrderDTO,
  RegistrationDTO,
} from "../../../dto";

export default {
  data() {
    return {
      token: this.$route.params.hash,
      orders: [] as MerchItemOrderDTO[],
      newOrder: {} as Record<number, { size: string; quantity: number }>,
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
  components: { ModalComponent },
  emits: ["expired-token", "update-registration"],
  methods: {
    initializeNewOrder() {
      if (!this.availableMerchItems) return;
      for (const merchItem of this.availableMerchItems) {
        this.newOrder[merchItem.id] = { size: "", quantity: 0 };
      }
    },
    validateAddOrderForm(merchItem: MerchItemDTO): boolean {
      if (
        this.newOrder[merchItem.id].quantity === 0 ||
        !this.newOrder[merchItem.id].size
      ) {
        this.fieldErrors[merchItem.id] = "pleaseSelect";
        return false;
      }

      this.fieldErrors[merchItem.id] = "";

      return true;
    },
    async addOrder(merchItem: MerchItemDTO) {
      if (!this.validateAddOrderForm(merchItem)) return;

      const order: {
        merchItemId: number;
        size: string;
        quantity: number;
      } = { merchItemId: merchItem.id, ...this.newOrder[merchItem.id] };

      this.isFormEnabled = false;
      this.isSubmitting = true;

      const existingOrder = this.orders.find(
        (o) => o.merch_item.id === merchItem.id && o.size === order.size
      );

      if (existingOrder) order.quantity += existingOrder.quantity;

      try {
        const updatedRegistration = await axios.post(
          `${import.meta.env.VITE_API_URL}events/${
            import.meta.env.VITE_EVENT_ID
          }/registrations/${this.registration?.id}/orders`,
          order,
          { headers: { Authorization: `Token ${this.token}` } }
        );

        this.$emit("update-registration", updatedRegistration.data);

        this.initializeNewOrder();
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
    async removeOrder(order: MerchItemOrderDTO) {
      this.isSubmitting = true;

      try {
        const updatedRegistration = await axios.delete(
          `${import.meta.env.VITE_API_URL}events/${
            import.meta.env.VITE_EVENT_ID
          }/registrations/${this.registration?.id}/orders/${order.id}`,
          { headers: { Authorization: `Token ${this.token}` } }
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
  },
  watch: {
    registration: {
      handler() {
        if (this.registration) {
          this.orders = this.registration.merch_items;
          this.initializeNewOrder();
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
      <div v-if="orders?.length">
        <div
          v-for="(order, i) in orders"
          :key="i"
          class="grid-container grid-row"
        >
          <div class="grid-item flex-container">
            <img
              :src="getImageUrl(order.merch_item)"
              :alt="order.merch_item.model"
              class="thumbnail"
              @click="selectedImage = getImageUrl(order.merch_item)"
            />
            <span>
              {{
                $t(
                  `userProfile.merchItems.${order.merch_item.translate_key}.title`
                )
              }}: {{ " " }}
              <span class="important">
                {{ order.merch_item.model.toUpperCase() }}
              </span>
            </span>
          </div>
          <div class="grid-item grid-container grid-row">
            <span class="grid-item">
              {{ $t("userProfile.merchItems.size") }}: {{ order.size }}
            </span>
            <span class="grid-item"
              >{{ $t("userProfile.merchItems.quantity") }}:
              {{ order.quantity }}</span
            >
            <button
              class="grid-item btn btn-secondary"
              @click="removeOrder(order)"
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
                @click="selectedImage = getImageUrl(merchItem)"
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
              <select v-model="newOrder[merchItem.id].size" class="grid-item">
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
                v-model.number="newOrder[merchItem.id].quantity"
                min="1"
                :placeholder="$t('userProfile.merchItems.quantity')"
              />
              <button
                class="grid-item btn btn-secondary"
                @click="addOrder(merchItem)"
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
  <ModalComponent v-if="selectedImage" @close="selectedImage = null">
    <img :src="selectedImage" class="full-image" />
  </ModalComponent>
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

.full-image {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 4px;
}
</style>
