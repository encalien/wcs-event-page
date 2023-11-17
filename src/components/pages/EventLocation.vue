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
    <h1>{{ $t('location.venue.pageTitle') }}</h1>
    <div class="flex-container flex-gap">
      <div class="flex-item margin-0">
        <p v-for="(p, i) in messages.location.venue.description">
          {{ $t(`location.slovenia.description[${i}]`) }}
        </p>
        <p class="flex-container flex-container-column">
          <span>{{ $t('location.venue.address.name') }}</span>
          <span>{{ $t('location.venue.address.address') }}</span>
          <span>{{ $t('location.venue.address.zipAndCity') }}</span>
        </p>
        <p class="margin-0">{{ $t(`location.venue.parkingText`) }}</p>
      </div>
      <div class="flex-item margin-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11069.855323518224!2d14.5136321!3d46.0817312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476532e8018ac3f7%3A0xfdd77079c72ef36c!2sAustria%20Trend%20Hotel%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1698868699761!5m2!1ssl!2ssi" width="400" height="300" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    
    <!-- <p>{{ $t(`location.venue.accessText`) }}</p> -->
    <!-- <img src="/src/assets/images/studio_dansa_entrance.jpg" alt="Entrance to Studio Dansa"> -->
  </section>
  <!-- <section>
    <h1>{{ $t('location.accommodation.title') }}</h1>
    <p v-for="(val, i) in messages.location.accommodation.description">
      {{ $t(`location.accommodation.suggestionsText[${i}]`) }}
    </p>
    <ul>
      <li v-for="(val, i) in messages.location.accommodation.list">
        <a :href="$t(`location.accommodation.list[${i}].url`)">{{ $t(`location.accommodation.list[${i}].name`) }}</a>
          - {{ $t(`location.accommodation.list[${i}].distance`) }}
      </li>
    </ul>
  </section> -->
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
