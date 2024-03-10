<script lang="ts">
import messages from '../../i18n/en';

export default {
  props: { staffIndex: Number },
  data() {
    return {
      messages: messages
    }
  }
}
</script>

<template>
  <section :id="`staff-${messages.workshops.staff[staffIndex].pageTitle}`" 
           v-if="staffIndex != null">
    <h1>{{ $t(`workshops.staff[${staffIndex}].pageTitle`) }}</h1>
    <div class="flex-container flex-container-column flex-gap">
      <div v-for="(person, i) in messages.workshops.staff[staffIndex].people"
           class="person-card" :class="{'background-accent':  i % 2 == 1}">
        <h2 class="center-text full-width">{{ $t(`workshops.staff[${staffIndex}].people[${i}].names`) }}</h2>
        <p v-if="staffIndex == 1" class="center-text full-width title-text">
          {{ $t(`workshops.staff[${staffIndex}].people[${i}].title`) }}
        </p>
        <div class="margin-0 flex-container"
             :class="{'flex-reverse': i % 2 == 1}">
          <div class="text" :class="{'left': i % 2 == 0, 'right': i % 2 == 1}">
            <p v-for="(p, j) in person.description">
              {{ $t(`workshops.staff[${staffIndex}].people[${i}].description[${j}]`) }}
            </p>
            <ul v-if="staffIndex == 1" v-for="(s, j) in person.songList">
              <li>{{ $t(`workshops.staff[${staffIndex}].people[${i}].songList[${j}]`) }}</li>
            </ul>
          </div>
          <div class="image" :class="{'left': i % 2 == 1, 'right': i % 2 == 0}">
            <div class="margin-0 flex-container">
              <img :src="$t(`workshops.staff[${staffIndex}].people[${i}].src`)" 
                   :alt="$t(`workshops.staff[${staffIndex}].people[${i}].names`)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  img {
    height: 100%;
    width: 100%;
  }

  .person-card {
    margin: 0 -2rem;
    padding: 2rem;
  }

  .background-accent {
    background-color: var(--accent-1);
  }

  .flex-reverse {
    background-color: var(--accent-1);
  }

  .left {
    margin-right: 2rem;
  }
  
  .right {
    margin-left: 2rem;
  }

  .text {
    flex-basis: 200%;
  }
  
  .image {
    flex-basis: 100%;
  }

  .title-text {
    margin-top: -1rem;
    font-weight: bold;
  }

  @media screen and (max-width: 650px) {
    .left, .right {
      margin: 1rem;
    }
  }
</style>
