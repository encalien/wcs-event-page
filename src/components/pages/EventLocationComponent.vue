<script lang="ts">
import messages from "../../i18n/en";

export default {
  props: { venueIndex: Number },
  data() {
    return {
      messages: messages,
    };
  },
};
</script>

<template>
  <section id="venue" v-if="venueIndex != null">
    <h1>{{ $t(`location.venue[${venueIndex}].pageTitle`) }}</h1>
    <div id="hotel-info">
      <h3>{{ $t(`location.venue[${venueIndex}].address.name`) }}</h3>
      <p
        v-for="(p, i) in messages.location.venue[venueIndex].description"
        :key="`${i}`"
      >
        {{ $t(`location.venue[${venueIndex}].description[${i}]`) }}
      </p>
      <div v-if="messages.location.venue[venueIndex].roomTypes">
        <div
          v-for="(type, i) in messages.location.venue[venueIndex].roomTypes"
          :key="`${i}`"
        >
          <div>
            <span class="important">{{
              $t(`location.venue[${venueIndex}].roomTypes[${i}].type`)
            }}</span>
            - {{ $t(`location.venue[${venueIndex}].roomTypes[${i}].beds`) }}
            <ul>
              <li v-for="(price, j) in type.prices" :key="`${j}`">
                {{
                  $t(
                    `location.venue[${venueIndex}].roomTypes[${i}].prices[${j}].occupancy`
                  )
                }}:
                <span class="important">
                  {{
                    $t(
                      `location.venue[${venueIndex}].roomTypes[${i}].prices[${j}].price`
                    )
                  }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="messages.location.venue[venueIndex].booking">
        <div>
          {{ $t(`location.venue[${venueIndex}].booking.text`) }}
          <ul>
            <li
              v-for="(link, i) in messages.location.venue[venueIndex].booking
                ?.links"
              :key="`${i}`"
            >
              <a
                :href="
                  $t(`location.venue[${venueIndex}].booking.links[${i}].link`)
                "
                target="_blank"
                >{{
                  $t(
                    `location.venue[${venueIndex}].booking.links[${i}].roomType`
                  )
                }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-container flex-gap">
      <div class="flex-item left">
        <h3>{{ $t(`location.venue[${venueIndex}].address.addressText`) }}</h3>
        <p class="flex-container flex-container-column">
          <span>{{ $t(`location.venue[${venueIndex}].address.name`) }}</span>
          <span>{{ $t(`location.venue[${venueIndex}].address.address`) }}</span>
          <span>{{
            $t(`location.venue[${venueIndex}].address.zipAndCity`)
          }}</span>
        </p>
        <p
          v-for="(p, i) in messages.location.venue[venueIndex].address.access"
          :key="`${i}`"
          v-html="$t(`location.venue[${venueIndex}].address.access[${i}]`)"
        ></p>
      </div>
      <div class="flex-item">
        <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11069.855323518224!2d14.5136321!3d46.0817312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476532e8018ac3f7%3A0xfdd77079c72ef36c!2sAustria%20Trend%20Hotel%20Ljubljana!5e0!3m2!1ssl!2ssi!4v1698868699761!5m2!1ssl!2ssi" width="400" height="300" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
        <a
          :href="$t(`location.venue[${venueIndex}].links.mapHref`)"
          target="_blank"
        >
          <img
            :src="$t(`location.venue[${venueIndex}].links.mapSrc`)"
            :alt="$t(`location.venue[${venueIndex}].address.name`)"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  text-align: left;
}

img {
  height: 100%;
  width: 100%;
}

hr {
  margin: 4rem auto;
}

#hotel-info {
  margin: 3rem 0;
}

.important {
  color: var(--black);
}

.flex-item {
  width: 100%;
}

.flex-item.left {
  margin: 0;
  padding: 0;
}

.map {
  height: 100%;
  border: none;
}

.flex-container-column {
  align-items: flex-start;
}
</style>
