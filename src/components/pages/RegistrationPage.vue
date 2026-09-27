<script lang="ts">
type Role = "Leader" | "Follower" | "";
type PairingMode = "solo" | "paired";

type TouchedFields = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  role: boolean;
  partnerEmail: boolean;
  terms: boolean;
};

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_REGISTRATION_SCRIPT_URL;

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      role: "" as Role,
      pairingMode: "solo" as PairingMode,
      wsdcId: "",
      partnerEmail: "",
      newsletter: false,
      acceptedTerms: false,
      comment: "",

      showWorkshopLevelInfo: false,
      submitting: false,
      submitted: false,
      errorMessage: "",

      touched: {
        firstName: false,
        lastName: false,
        email: false,
        role: false,
        partnerEmail: false,
        terms: false,
      } as TouchedFields,
    };
  },

  computed: {
    emailValid(): boolean {
      return /^\S+@\S+\.\S+$/.test(this.email.trim());
    },

    partnerEmailValid(): boolean {
      if (this.pairingMode === "solo") {
        return true;
      }

      return /^\S+@\S+\.\S+$/.test(this.partnerEmail.trim());
    },

    formValid(): boolean {
      return (
        this.firstName.trim().length > 0 &&
        this.lastName.trim().length > 0 &&
        this.emailValid &&
        this.role !== "" &&
        this.partnerEmailValid &&
        this.acceptedTerms
      );
    },
  },

  watch: {
    pairingMode(value: PairingMode) {
      if (value === "solo") {
        this.partnerEmail = "";
        this.touched.partnerEmail = false;
      }
    },
  },

  methods: {
    toggleWorkshopLevelInfo() {
      this.showWorkshopLevelInfo = !this.showWorkshopLevelInfo;
    },

    markTouched(field: keyof TouchedFields) {
      this.touched[field] = true;
    },

    markAllTouched() {
      this.touched.firstName = true;
      this.touched.lastName = true;
      this.touched.email = true;
      this.touched.role = true;
      this.touched.terms = true;

      if (this.pairingMode === "paired") {
        this.touched.partnerEmail = true;
      }
    },

    async submitRegistration() {
      this.errorMessage = "";
      this.markAllTouched();

      if (!this.formValid) {
        return;
      }

      this.submitting = true;

      const payload = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        country: this.country.trim(),
        role: this.role,
        wsdcId: this.wsdcId.trim(),
        partnerEmail:
          this.pairingMode === "paired" ? this.partnerEmail.trim() : "",
        newsletter: this.newsletter,
        acceptedTerms: this.acceptedTerms,
        comment: this.comment.trim(),
      };

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = JSON.parse(await response.text());

        if (!result.ok) {
          throw new Error(result.error ?? "Registration failed.");
        }

        this.submitted = true;
      } catch (error) {
        console.error(error);

        this.errorMessage = this.$t("registration.form.error") as string;
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<template>
  <section class="container py-4 py-lg-5">
    <header class="text-center mb-5">
      <h1 class="display-5 fw-bold mb-5 text-center">
        {{ $t("registration.pageTitle") }}
      </h1>

      <p
        class="text-body-secondary mb-0"
        v-html="$t('registration.registrationInfoText')"
      ></p>
    </header>

    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <!-- Registration status -->
        <section class="mb-5">
          <h2 class="h4 fw-bold mb-3">
            {{ $t("registration.statusInfo.title") }}
          </h2>

          <ol class="mb-0 ps-4">
            <li v-for="(_, i) in 3" :key="i" class="mb-3 ps-1">
              <strong>
                {{ $t(`registration.statusInfo.items[${i}].title`) }}
              </strong>

              <div class="mt-1">
                {{ $t(`registration.statusInfo.items[${i}].text`) }}
              </div>
            </li>
          </ol>
        </section>

        <!-- Couple information -->
        <section class="mb-5">
          <h2 class="h4 fw-bold mb-2">
            {{ $t("registration.coupleInfo.title") }}
          </h2>

          <p class="mb-2">
            {{ $t("registration.coupleInfo.intro") }}
          </p>

          <ul class="mb-0 ps-4">
            <li v-for="(_, i) in 4" :key="i" class="mb-1">
              {{ $t(`registration.coupleInfo.items[${i}]`) }}
            </li>
          </ul>
        </section>

        <!-- Success -->
        <div v-if="submitted" class="text-center py-5">
          <h2 class="h3 fw-bold text-primary mb-3">
            {{ $t("registration.form.success.title") }}
          </h2>

          <p class="mb-0">
            {{ $t("registration.form.success.text") }}
          </p>
        </div>

        <!-- Form -->
        <form v-else novalidate @submit.prevent="submitRegistration">
          <h2 class="h4 fw-bold mb-3">
            {{ $t("registration.form.personalInfo") }}
          </h2>

          <div class="row g-3 mb-5">
            <div class="col-12 col-md-6">
              <label for="firstName" class="form-label">
                {{ $t("registration.form.firstName") }} *
              </label>

              <input
                id="firstName"
                v-model="firstName"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': touched.firstName && !firstName.trim(),
                }"
                autocomplete="given-name"
                @blur="markTouched('firstName')"
              />

              <div class="invalid-feedback">
                {{ $t("registration.form.validation.firstName") }}
              </div>
            </div>

            <div class="col-12 col-md-6">
              <label for="lastName" class="form-label">
                {{ $t("registration.form.lastName") }} *
              </label>

              <input
                id="lastName"
                v-model="lastName"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': touched.lastName && !lastName.trim(),
                }"
                autocomplete="family-name"
                @blur="markTouched('lastName')"
              />

              <div class="invalid-feedback">
                {{ $t("registration.form.validation.lastName") }}
              </div>
            </div>

            <div class="col-12 col-md-6">
              <label for="email" class="form-label">
                {{ $t("registration.form.email") }} *
              </label>

              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                :class="{
                  'is-invalid': touched.email && !emailValid,
                }"
                autocomplete="email"
                required
                @blur="markTouched('email')"
              />

              <div class="invalid-feedback">
                {{ $t("registration.form.validation.email") }}
              </div>
            </div>

            <div class="col-12 col-md-6">
              <label for="country" class="form-label">
                {{ $t("registration.form.country") }}
              </label>

              <input
                id="country"
                v-model="country"
                type="text"
                class="form-control"
                autocomplete="country-name"
              />
            </div>
          </div>

          <h2 class="h4 fw-bold mb-3">
            {{ $t("registration.form.workshopInfo") }}
          </h2>

          <!-- Role -->
          <fieldset class="mb-4">
            <legend class="form-label fs-6 mb-2">
              {{ $t("registration.form.role.label") }} *
            </legend>

            <div class="d-flex gap-4">
              <div class="form-check">
                <input
                  id="roleLeader"
                  v-model="role"
                  type="radio"
                  class="form-check-input"
                  value="Leader"
                  name="role"
                  @change="markTouched('role')"
                />

                <label class="form-check-label" for="roleLeader">
                  {{ $t("registration.form.role.leader") }}
                </label>
              </div>

              <div class="form-check">
                <input
                  id="roleFollower"
                  v-model="role"
                  type="radio"
                  class="form-check-input"
                  value="Follower"
                  name="role"
                  @change="markTouched('role')"
                />

                <label class="form-check-label" for="roleFollower">
                  {{ $t("registration.form.role.follower") }}
                </label>
              </div>
            </div>

            <div v-if="touched.role && !role" class="text-danger small mt-1">
              {{ $t("registration.form.validation.role") }}
            </div>
          </fieldset>

          <!-- Pairing -->
          <div class="mb-4">
            <div class="form-check mb-2">
              <input
                id="pairingSolo"
                v-model="pairingMode"
                type="radio"
                class="form-check-input"
                name="pairingMode"
                value="solo"
              />

              <label class="form-check-label" for="pairingSolo">
                {{ $t("registration.form.pairing.solo") }}
              </label>
            </div>

            <div class="form-check">
              <input
                id="pairingPaired"
                v-model="pairingMode"
                type="radio"
                class="form-check-input"
                name="pairingMode"
                value="paired"
              />

              <label class="form-check-label" for="pairingPaired">
                {{ $t("registration.form.pairing.paired") }}
              </label>
            </div>
          </div>

          <!-- Partner email -->
          <div v-if="pairingMode === 'paired'" class="mb-4">
            <label for="partnerEmail" class="form-label">
              {{ $t("registration.form.partnerEmail") }} *
            </label>

            <input
              id="partnerEmail"
              v-model="partnerEmail"
              type="email"
              class="form-control"
              :class="{
                'is-invalid': touched.partnerEmail && !partnerEmailValid,
              }"
              autocomplete="email"
              required
              @blur="markTouched('partnerEmail')"
            />

            <div class="invalid-feedback">
              {{ $t("registration.form.validation.partnerEmail") }}
            </div>

            <div class="form-text">
              {{ $t("registration.form.partnerEmailHelp") }}
            </div>
          </div>

          <!-- WSDC -->
          <div class="mb-4">
            <label for="wsdcId" class="form-label">
              {{ $t("registration.form.wsdcId") }}
            </label>

            <input
              id="wsdcId"
              v-model="wsdcId"
              type="text"
              class="form-control"
            />

            <div class="form-text">
              {{ $t("registration.form.wsdcIdHelp") }}

              <button
                type="button"
                class="border-0 bg-transparent p-0 ms-1 text-primary text-decoration-underline"
                style="font-size: inherit"
                :aria-expanded="showWorkshopLevelInfo"
                @click="toggleWorkshopLevelInfo"
              >
                {{ $t("registration.workshopLevels.why") }}
              </button>
            </div>

            <div
              v-if="showWorkshopLevelInfo"
              class="bg-body-tertiary rounded-3 p-3 mt-3"
            >
              <h3 class="h6 fw-bold mb-2">
                {{ $t("registration.workshopLevels.title") }}
              </h3>

              <p class="mb-2">
                {{ $t("registration.workshopLevels.intro") }}
              </p>

              <ul class="mb-3 ps-4">
                <li v-for="(_, i) in 2" :key="i" class="mb-1">
                  <strong>
                    {{ $t(`registration.workshopLevels.levels[${i}].title`) }}
                  </strong>
                  —
                  {{ $t(`registration.workshopLevels.levels[${i}].text`) }}
                </li>
              </ul>

              <p class="mb-2">
                {{ $t("registration.workshopLevels.assignment") }}

                <a
                  href="https://www.worldsdc.com/registry-points/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t("registration.workshopLevels.wsdcLinkText") }}
                </a>
              </p>

              <p class="mb-0">
                {{ $t("registration.workshopLevels.audition") }}
              </p>
            </div>
          </div>

          <!-- Comment -->
          <div class="mb-4">
            <label for="comment" class="form-label">
              {{ $t("registration.form.comment") }}
            </label>

            <textarea
              id="comment"
              v-model="comment"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <!-- Newsletter -->
          <div class="form-check mb-3">
            <input
              id="newsletter"
              v-model="newsletter"
              type="checkbox"
              class="form-check-input"
            />

            <label class="form-check-label" for="newsletter">
              {{ $t("registration.form.newsletter") }}
            </label>
          </div>

          <!-- Terms -->
          <div class="form-check mb-4">
            <input
              id="terms"
              v-model="acceptedTerms"
              type="checkbox"
              class="form-check-input"
              :class="{
                'is-invalid': touched.terms && !acceptedTerms,
              }"
              @change="markTouched('terms')"
              @blur="markTouched('terms')"
            />

            <label class="form-check-label" for="terms">
              {{ $t("registration.form.terms.before") }}

              <router-link
                :to="`/${$store.state.lang}/terms-and-conditions`"
                target="_blank"
              >
                {{ $t("registration.form.terms.link") }}
              </router-link>

              {{ $t("registration.form.terms.after") }} *
            </label>

            <div
              v-if="touched.terms && !acceptedTerms"
              class="text-danger small mt-1"
            >
              {{ $t("registration.form.validation.terms") }}
            </div>
          </div>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <div class="text-center mt-4">
            <button
              type="submit"
              class="btn btn-primary btn-lg px-4"
              :disabled="submitting"
            >
              {{
                submitting
                  ? $t("registration.form.submitting")
                  : $t("registration.form.submit")
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
