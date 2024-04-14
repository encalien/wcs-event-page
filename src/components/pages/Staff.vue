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
  <template v-for="(team, t) in messages.staff.teams">
    <section :id="`staff-${team.pageTitle}`">
      <h1>{{ $t(`staff.teams[${t}].pageTitle`) }}</h1>
      <div class="flex-container flex-container-column flex-gap">
        <div v-for="(person, i) in team.people"
            class="person-card" :class="{'background-accent':  i % 2 == 1}">
          <h2 class="center-text full-width">{{ $t(`staff.teams[${t}].people[${i}].names`) }}</h2>
          <p v-if="t > 0 && t < messages.staff.teams.length - 1" class="center-text full-width title-text">
            {{ $t(`staff.teams[${t}].people[${i}].title`) }}
          </p>
          <div class="margin-0 flex-container"
              :class="{'flex-reverse': i % 2 == 1}">
            <div class="text" :class="{'left': i % 2 == 0, 'right': i % 2 == 1}">
              <p v-for="(p, j) in person.description">
                {{ $t(`staff.teams[${t}].people[${i}].description[${j}]`) }}
              </p>
              <ul v-if="t == 1" v-for="(s, j) in person.songList">
                <li>{{ $t(`staff.teams[${t}].people[${i}].songList[${j}]`) }}</li>
              </ul>
            </div>
            <div class="image" :class="{'left': i % 2 == 1, 'right': i % 2 == 0}">
              <div class="margin-0 flex-container">
                <img :src="$t(`staff.teams[${t}].people[${i}].src`)" 
                    :alt="$t(`staff.teams[${t}].people[${i}].names`)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr v-if="t < messages.staff.teams.length - 1">
  </template>
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
