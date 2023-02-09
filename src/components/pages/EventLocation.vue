<script lang="ts">
export default {

}
</script>

<template>
  <div>
    <h1>{{ $t('location.pageTitle') }}</h1>
    <p>
      {{ $t(`location.workshopsLocationText`) }}
    </p>
    <address>
      <p>{{ $t('location.workshopsLocationAddress.name') }}</p>
      <p>{{ $t('location.workshopsLocationAddress.address') }}</p>
      <p>{{ $t('location.workshopsLocationAddress.zipAndCity') }}</p>
      <p>{{ $t('location.workshopsLocationAddress.country') }}</p>
    </address>

    <p v-for="i in [0,1]">
      {{ $t(`location.hotelSuggestionsText[${i}]`) }}
    </p>
    <li v-for="i in [0,1,2,3]">
      <a :href="$t(`location.hotelList[${i}].url`)" v-html="$t(`location.hotelList[${i}].name`)"></a>
         - {{ $t(`location.hotelList[${i}].distance`) }}
    </li>
  </div>
</template>

<style scoped>
</style>
