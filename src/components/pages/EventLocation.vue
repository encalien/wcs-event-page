<script lang="ts">
import messages from "../../i18n/en";

export default {
  data() {
    return {
      messages: messages,
    };
  },
};
</script>

<template>
  <section id="venue">
    <h1>{{ $t("location.pageTitle") }}</h1>
    <div v-for="(val, i) in messages.location.venue" :key="i">
      <div class="flex-container flex-gap">
        <div class="flex-item margin-0">
          <p>{{ $t(`location.venue[${i}].locationText`) }}</p>
          <p class="flex-container flex-container-column">
            <span>{{ $t(`location.venue[${i}].address.name`) }}</span>
            <span>{{ $t(`location.venue[${i}].address.address`) }}</span>
            <span>{{ $t(`location.venue[${i}].address.zipAndCity`) }}</span>
          </p>
          <p v-if="i === 1" class="margin-0">
            {{ $t(`location.venue[${i}].busText`) }}
          </p>
          <p class="margin-0">{{ $t(`location.venue[${i}].parkingText`) }}</p>
        </div>
        <div class="margin-0">
          <iframe
            :src="$t(`location.venue[${i}].mapSrc`)"
            class="map"
            allow="fullscreen"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <br />
      <hr />
    </div>

    <!-- <p>{{ $t(`location.venue.accessText`) }}</p> -->
    <!-- <img src="/src/assets/images/studio_dansa_entrance.jpg" alt="Entrance to Studio Dansa"> -->
  </section>
  <section>
    <h1>{{ $t("location.hotel.title") }}</h1>
    <p v-for="(val, i) in messages.location.hotel.suggestionsText" :key="i">
      {{ $t(`location.hotel.suggestionsText[${i}]`) }}
    </p>
    <ul>
      <li v-for="(val, i) in messages.location.hotel.list" :key="i">
        <a :href="$t(`location.hotel.list[${i}].url`)">{{
          $t(`location.hotel.list[${i}].name`)
        }}</a>
        - {{ $t(`location.hotel.list[${i}].distance`) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.map {
  width: 500px;
  height: 300px;
  border: none;
}

.flex-container-column {
  align-items: flex-start;
}
</style>
