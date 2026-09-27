<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages,
    };
  },
};
</script>

<template>
  <section class="container py-4 py-lg-5">
    <!-- Header -->
    <header>
      <h1 class="display-5 fw-bold mb-5 text-center">
        {{ $t("workshops.pricing.pageTitle") }}
      </h1>

      <div>
        <p
          v-for="(val, i) in messages.workshops.pricing.description"
          :key="i"
          class="mb-2 text-body-secondary lh-lg"
        >
          {{ $t(`workshops.pricing.description[${i}]`) }}
        </p>
      </div>
    </header>

    <!-- Pricing -->
    <div class="row g-3 mt-4 mt-lg-5 align-items-stretch">
      <!-- Full pass -->
      <div class="col-12 col-lg-4">
        <article class="card h-100 border rounded-4 shadow-sm bg-light">
          <div class="card-body p-4 d-flex flex-column justify-content-center">
            <h3 class="display-6 fw-bold mb-3">
              {{ $t("workshops.pricing.passInfo.title") }}
            </h3>

            <div class="pricing-rule mb-3"></div>

            <div class="fw-semibold text-body-secondary mb-3">
              {{ $t("workshops.pricing.passInfo.includesText") }}
            </div>

            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li
                v-for="(val, i) in messages.workshops.pricing.passInfo.includes"
                :key="i"
                class="d-flex align-items-start gap-2"
              >
                <span class="pricing-check flex-shrink-0" aria-hidden="true">
                  ✓
                </span>

                <span>
                  {{ $t(`workshops.pricing.passInfo.includes[${i}]`) }}
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Price tiers -->
      <div
        v-for="(tier, i) in messages.workshops.pricing.priceTiers"
        :key="i"
        class="col-12 col-md-4 col-lg"
      >
        <article
          class="card h-100 border rounded-4 overflow-hidden shadow-sm"
          :class="i === 0 ? 'bg-body-tertiary' : 'bg-light'"
        >
          <div
            class="card-header text-center fw-bold text-uppercase border-0 px-3 py-3"
            :class="
              i === 0 ? 'bg-primary text-light' : 'bg-transparent text-primary'
            "
            style="letter-spacing: 0.12em"
          >
            {{ $t(`workshops.pricing.priceTiers[${i}].title`) }}
          </div>

          <div class="card-body text-center pricing-tier-body">
            <!-- Price -->
            <div class="d-flex align-items-center justify-content-center">
              <div class="pricing-price text-primary fw-bold">
                <span class="pricing-amount">
                  {{ $t(`workshops.pricing.priceTiers[${i}].price`) }}
                </span>

                <span class="pricing-currency"> € </span>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-top"></div>

            <!-- Validity -->
            <p
              class="mb-0 text-body-secondary d-flex align-items-center justify-content-center lh-base px-1"
            >
              {{ $t(`workshops.pricing.priceTiers[${i}].validity`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <p class="mt-5 mb-0 fw-semibold text-primary">
      {{ $t("workshops.pricing.partyEntrance") }}
    </p>
  </section>
</template>

<style scoped>
.pricing-rule {
  width: 6rem;
  height: 3px;
  background-color: var(--bs-secondary);
  border-radius: 999px;
}

.pricing-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.1rem;
  border-radius: 50%;
  background-color: var(--bs-tertiary-bg);
  color: var(--bs-primary);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1;
}

/*
 * Keeps price, divider and validity text in exactly the same
 * vertical positions across all three tier cards.
 */
.pricing-tier-body {
  display: grid;
  grid-template-rows: 7rem auto 5rem;
  gap: 0;
  padding: 1rem;
}

.pricing-price {
  position: relative;
  width: fit-content;
  line-height: 1;
}

/*
 * Only the number participates in horizontal centering.
 * The € hangs to its left.
 */
.pricing-amount {
  display: block;
  font-size: clamp(3rem, 4vw, 4.25rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
}

.pricing-currency {
  position: absolute;
  right: 100%;
  bottom: 0.18em;
  margin-right: 0.3rem;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 767.98px) {
  .pricing-tier-body {
    grid-template-rows: 5.5rem auto auto;
    padding: 0.9rem 1rem 1rem;
  }

  .pricing-tier-body p {
    padding-top: 0.85rem;
    min-height: 3.5rem;
  }

  .pricing-amount {
    font-size: 3.25rem;
  }

  .pricing-currency {
    font-size: 1.25rem;
  }
}

@media (min-width: 768px) {
  .pricing-tier-body p {
    padding-top: 1rem;
  }
}
</style>
