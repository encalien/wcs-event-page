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
  <!-- Hero / flyer -->
  <section class="text-center">
    <picture>
      <source
        media="(max-width: 575.98px)"
        srcset="/images/fall_focus_2026_ig.jpg"
      />

      <img
        src="/images/fall_focus_2026_landscape.jpg"
        :alt="$t('event.name')"
        class="img-fluid w-100 rounded-2"
      />
    </picture>

    <div class="py-4">
      <h1 class="h2 fw-bold mb-3">
        {{ $t("event.location") }}, {{ $t("event.date") }}
      </h1>

      <p class="fs-5 mb-3">
        {{ $t("event.welcomeText") }}
      </p>

      <router-link
        :to="`/${$store.state.lang}/registration`"
        class="btn btn-primary px-4 py-2 fw-semibold w-50"
      >
        {{ $t("registration.pageTitle") }}
      </router-link>
    </div>
  </section>

  <hr />

  <!-- About WCS -->
  <section>
    <header class="text-center mb-4">
      <h2 class="display-6 fw-bold mb-3">
        {{ $t("home.aboutWCS.title") }}
      </h2>
    </header>

    <div class="mb-4 mb-lg-5">
      <p
        v-for="(val, i) in messages.home.aboutWCS.description"
        :key="i"
        class="mb-3"
      >
        {{ $t(`home.aboutWCS.description[${i}]`) }}
      </p>
    </div>

    <!-- Photo/video collage -->
    <div class="row g-2">
      <!-- Large featured image -->
      <div v-if="messages.home.aboutWCS.yt[0]" class="col-12 col-lg-8">
        <a
          :href="$t('home.aboutWCS.yt[0].href')"
          target="_blank"
          rel="noopener noreferrer"
          class="d-block position-relative overflow-hidden text-decoration-none"
        >
          <div class="ratio ratio-16x9">
            <img
              :src="$t('home.aboutWCS.yt[0].src')"
              :alt="$t('home.aboutWCS.yt[0].name')"
              class="w-100 h-100 object-fit-cover"
            />
          </div>

          <div
            class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white p-3"
          >
            <span class="h4 fw-bold text-center mb-0">
              {{ $t("home.aboutWCS.yt[0].name") }}
            </span>
          </div>
        </a>
      </div>

      <!-- Two images on the right -->
      <div class="col-12 col-lg-4">
        <div class="row g-2">
          <div v-for="i in [1, 2]" :key="i" class="col-12 col-sm-6 col-lg-12">
            <a
              :href="$t(`home.aboutWCS.yt[${i}].href`)"
              target="_blank"
              rel="noopener noreferrer"
              class="d-block position-relative overflow-hidden text-decoration-none"
            >
              <div class="ratio ratio-16x9">
                <img
                  :src="$t(`home.aboutWCS.yt[${i}].src`)"
                  :alt="$t(`home.aboutWCS.yt[${i}].name`)"
                  class="w-100 h-100 object-fit-cover"
                />
              </div>

              <div
                class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white p-3"
              >
                <span class="h5 fw-bold text-center mb-0">
                  {{ $t(`home.aboutWCS.yt[${i}].name`) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom row -->
      <div v-for="i in [3, 4, 5]" :key="i" class="col-12 col-md-4">
        <a
          :href="$t(`home.aboutWCS.yt[${i}].href`)"
          target="_blank"
          rel="noopener noreferrer"
          class="d-block position-relative overflow-hidden text-decoration-none"
        >
          <div class="ratio ratio-16x9">
            <img
              :src="$t(`home.aboutWCS.yt[${i}].src`)"
              :alt="$t(`home.aboutWCS.yt[${i}].name`)"
              class="w-100 h-100 object-fit-cover"
            />

            <div
              class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white p-3"
            >
              <span class="h5 fw-bold text-center mb-0">
                {{ $t(`home.aboutWCS.yt[${i}].name`) }}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-overlay {
  opacity: 0;
  transition: opacity 0.2s ease;
}

a:hover .video-overlay,
a:focus-visible .video-overlay {
  opacity: 1;
}
</style>
