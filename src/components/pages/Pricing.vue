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
  <section>
    <h1>{{ $t('workshops.pricing.pageTitle') }}</h1>
    <p v-for="(val, i) in messages.workshops.pricing.description">
      {{ $t(`workshops.pricing.description[${i}]`) }}
    </p>

    <div id="passes" class="flex-container">
      <div v-for="(val, i) in messages.workshops.pricing.passes" class="pass" :class="`bg-${i + 1}`">
        <div class="price-tier-band">{{ $t('workshops.pricing.priceTier') }}</div>
        <h3>{{ $t(`workshops.pricing.passes[${i}].title`) }}</h3>
        <hr>
        <ul>
          <li v-for="(val, j) in messages.workshops.pricing.passes[i].includes">
            {{ $t(`workshops.pricing.passes[${i}].includes[${j}]`) }}
          </li>
        </ul>
        <p class="price">{{ $t(`workshops.pricing.passes[${i}].price`) }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  #passes {
    justify-content: space-between;
    gap: 2rem;
  }

  .pass {
    flex: 1 1 300px;
    padding: 3rem 2rem 2rem;
    border: 2px solid var(--black);
    border-radius: 2px;
    overflow: hidden;
  }

  .pass > h3 {
    font-size: 1.6rem;
  }

  .pass > ul {
    height: 4rem;
    text-align: center;
    list-style: none;
    padding: 0;
  }

  .pass > .price {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem auto 0;
  }

  .bg-1 {
    background-color: var(--accent-1);
  }

  .bg-2 {
    background-color: var(--accent-2);
  }

  .bg-3 {
    background-color: var(--accent-3);
  }

  .price-tier-band {
    background-color: var(--color-background-alt);
    color: var(--color-text-alt);
    position: absolute;
    top: 1.2rem;
    right: -2.7rem;
    width: 10rem;
    transform: rotate(45deg);
    padding: 0.5rem;
    text-align: center;
  }

  @media screen and (max-width: 900px) {
    #passes {
      flex-direction: column;
      align-items: center;
    }

    .pass {
      flex: none;
      width: 70%;
    }
  }

  @media screen and (max-width: 650px) {
    .pass {
      flex: none;
      width: 100%;
    }
  }
</style>
