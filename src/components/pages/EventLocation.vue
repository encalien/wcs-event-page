<script lang="ts">
import messages from '../../i18n/en';

export default {
  data() {
    return {
      messages: messages
    }
  }
}
</script>

<template>
  <section id="venue">
    <h1>{{ $t('location.pageTitle') }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item margin-0">
        <p>{{ $t(`location.venue.locationText`) }}</p>
        <p class="flex-container flex-container-column">
          <span>{{ $t('location.venue.address.name') }}</span>
          <span>{{ $t('location.venue.address.address') }}</span>
          <span>{{ $t('location.venue.address.zipAndCity') }}</span>
        </p>
        <p class="margin-0">{{ $t(`location.venue.parkingText`) }}</p>
      </div>
      <div class="flex-item margin-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.5550688276053!2d14.506221715189787!3d46.05997230151305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765329bda01817d%3A0x3598d33068363f77!2sStudio%20Dansa!5e0!3m2!1ssl!2ssi!4v1676034152943!5m2!1ssl!2ssi" class="map" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    
    <!-- <p>{{ $t(`location.venue.accessText`) }}</p> -->
    <!-- <img src="/src/assets/images/studio_dansa_entrance.jpg" alt="Entrance to Studio Dansa"> -->
  </section>
  <section>
    <h1>{{ $t('location.hotel.title') }}</h1>
    <p v-for="(val, i) in messages.location.hotel.suggestionsText">
      {{ $t(`location.hotel.suggestionsText[${i}]`) }}
    </p>
    <ul>
      <li v-for="(val, i) in messages.location.hotel.list">
        <a :href="$t(`location.hotel.list[${i}].url`)">{{ $t(`location.hotel.list[${i}].name`) }}</a>
          - {{ $t(`location.hotel.list[${i}].distance`) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
  .map {
    height: 100%;
    border: none;
  }

  .flex-container-column {
    align-items: flex-start;
  }
</style>
