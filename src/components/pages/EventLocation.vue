<script lang="ts">
export default {

}
</script>

<template>
  <div>
    <h1>{{ $t('location.pageTitle') }}</h1>
    <p>
      {{ $t(`location.venue.locationText`) }}
    </p>
    <address>
      <p>{{ $t('location.venue.address.name') }}</p>
      <p>{{ $t('location.venue.address.address') }}</p>
      <p>{{ $t('location.venue.address.zipAndCity') }}</p>
    </address>
    
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.5550688276053!2d14.506221715189787!3d46.05997230151305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765329bda01817d%3A0x3598d33068363f77!2sStudio%20Dansa!5e0!3m2!1ssl!2ssi!4v1676034152943!5m2!1ssl!2ssi" class="map" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    
    <p>{{ $t(`location.venue.parkingText`) }}</p>
    <p>{{ $t(`location.venue.accessText`) }}</p>

    <img src="/src/assets/images/studio_dansa_entrance.jpg" alt="Entrance to Studio Dansa">

    <p v-for="i in [0,1]">
      {{ $t(`location.hotel.suggestionsText[${i}]`) }}
    </p>
    <li v-for="i in [0,1,2,3]">
      <a :href="$t(`location.hotel.list[${i}].url`)">{{ $t(`location.hotel.list[${i}].name`) }}</a>
         - {{ $t(`location.hotel.list[${i}].distance`) }}
    </li>
  </div>
</template>

<style scoped>
  .map {
    width: 100%;
    height: 300px;
    border: none;
  }
</style>
