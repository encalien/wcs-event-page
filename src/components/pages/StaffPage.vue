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
    <header class="text-center mb-5">
      <h1 class="display-5 fw-bold mb-5 text-center">
        {{ $t("workshops.staff.pageTitle") }}
      </h1>
    </header>

    <!-- Teachers -->
    <div
      v-for="(teacher, t) in messages.workshops.staff.teachers"
      :key="t"
      class="row g-4 g-lg-5 align-items-center mt-3"
    >
      <!-- Image -->
      <div
        v-if="teacher.src"
        class="col-12 col-lg-5"
        :class="{ 'order-lg-2': t % 2 === 0 }"
      >
        <img
          :src="$t(`workshops.staff.teachers[${t}].src`)"
          :alt="$t(`workshops.staff.teachers[${t}].name`)"
          class="img-fluid w-100 h-auto rounded-3"
        />
      </div>

      <!-- Bio -->
      <div class="col-12 col-lg-7" :class="{ 'order-lg-1': t % 2 === 0 }">
        <h2 v-if="teacher.name" class="h2 fw-bold mb-4">
          {{ $t(`workshops.staff.teachers[${t}].name`) }}
        </h2>

        <p v-for="(val, i) in teacher.description" :key="i" class="mb-3">
          {{ $t(`workshops.staff.teachers[${t}].description[${i}]`) }}
        </p>
      </div>
    </div>
  </section>
</template>
