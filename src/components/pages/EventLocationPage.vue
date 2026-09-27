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
    <!-- Page title -->
    <header class="text-center mb-4 mb-lg-5">
      <h1 class="display-5 fw-bold mb-5 text-center">
        {{ $t("location.pageTitle") }}
      </h1>
    </header>

    <!-- Venue -->
    <div
      v-for="(venue, i) in messages.location.venue"
      :key="i"
      class="row g-4 g-lg-5 align-items-start"
    >
      <!-- Venue information -->
      <div class="col-12 col-lg-6">
        <p class="mb-4">
          {{ $t(`location.venue[${i}].locationText`) }}
        </p>

        <h3 class="fw-bold mb-2 text-start">
          {{ $t(`location.venue[${i}].address.name`) }}
        </h3>

        <address class="mb-4">
          <div>
            {{ $t(`location.venue[${i}].address.address`) }}
          </div>
          <div>
            {{ $t(`location.venue[${i}].address.zipAndCity`) }}
          </div>
        </address>

        <div v-if="i === 1" class="mb-4">
          {{ $t(`location.venue[${i}].busText`) }}
        </div>

        <hr class="my-4 opacity-25" />

        <h3 class="fw-bold mb-3 text-start">
          {{ $t(`location.venue[${i}].parkingTitle`) }}
        </h3>

        <p class="mb-0">
          {{ $t(`location.venue[${i}].parkingText`) }}
        </p>
      </div>

      <!-- Map -->
      <div class="col-12 col-lg-6">
        <div class="ratio ratio-16x9">
          <iframe
            :src="$t(`location.venue[${i}].mapSrc`)"
            class="rounded-3"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="$t(`location.venue[${i}].address.name`)"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Accommodation -->
    <section class="mt-5 pt-4 border-top">
      <h3 class="fw-bold mb-3 text-start">
        {{ $t("location.hotel.title") }}
      </h3>

      <p
        v-for="(val, i) in messages.location.hotel.suggestionsText"
        :key="i"
        class="mb-3"
      >
        {{ $t(`location.hotel.suggestionsText[${i}]`) }}
      </p>

      <ul class="mb-0 ps-4">
        <li v-for="(val, i) in messages.location.hotel.list" :key="i">
          <a
            :href="$t(`location.hotel.list[${i}].url`)"
            class="link-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t(`location.hotel.list[${i}].name`) }}
          </a>

          <span> — {{ $t(`location.hotel.list[${i}].distance`) }} </span>
        </li>
      </ul>
    </section>
  </section>
</template>
