<script lang="ts">
import messages from '../../i18n/en';

export default {
  data() {
    return {
      messages: messages,
      activeTierIndex: -1
    }
  },
  methods: {
    setActiveTierIndex: function () {
      const tierDates = messages.workshops.pricing.passPrices[0].dates as any[]
      const today = new Date();
      
      for (let i = 0; i < tierDates.length; i++) {
        const tierFrom = new Date(tierDates[i].from);
        const tierTo = new Date(tierDates[i].to);
        if (today >= tierFrom && today <= tierTo) {
          this.activeTierIndex = i;
          return;
        }
      }
      this.activeTierIndex = -1;
    }
  },
  created () { 
    this.setActiveTierIndex()
  },
}
</script>

<template>
  <section>
    <h1>{{ $t('workshops.pricing.pageTitle') }}</h1>
    <p v-for="(val, i) in messages.workshops.pricing.description">
      {{ $t(`workshops.pricing.description[${i}]`) }}
    </p>

    <div id="passPrices" class="grid-container">
      <div v-for="(pass, i) in messages.workshops.pricing.passPrices" 
           class="grid-container grid-row" :class="{'not-mobile': i === 0}">
        <h3 class="grid-item grid-center">
          {{ $t(`workshops.pricing.passPrices[${i}].type`) }}
        </h3>
        <div v-for="(tier, j) in pass.tiers" 
             class="grid-item grid-mobile" 
             :class="{'grid-center': i, 'active': activeTierIndex === j}">
          <span class="mobile-only align-left" :class="{'not-mobile': i === 0}">
            {{ $t(`workshops.pricing.passPrices[0].tiers[${j}]`) }}
          </span>
          <span class="align-right" :class="{'not-mobile': i === 0}">
            {{ $t(`workshops.pricing.passPrices[${i}].tiers[${j}]`) }}
          </span>
        </div>
      </div>
    </div>

    <div id="passes" class="flex-container">
      <div v-for="(val, i) in messages.workshops.pricing.passes" class="pass" :class="`bg-${i + 1}`">
        <div class="price-tier-band">{{ $t('workshops.pricing.currentPriceTier') }}</div>
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
  #passPrices h3 {
    margin: 0;
  }

  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: -0.5rem 0;
    align-items: end;
  }

  .grid-row.grid-container {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-template-rows: 2fr 1fr 1fr 1fr 1fr;
    margin: 0;
  }

  .grid-item {
    padding: 0.5rem;
  }

  .grid-center {
    text-align: center;
  }

  .active {
    background-color: var(--accent-1);
  }

  #passes {
    justify-content: space-between;
    gap: 2rem;
    margin-top: 2rem;
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

    .grid-container {
      grid-template-columns: 1fr;
    }

    .grid-container.grid-row {
      align-items: end;
    }

    .grid-item.grid-mobile {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }

    .align-left {
      text-align: left;
    }

    .align-right {
      text-align: right;
    }

    .not-mobile {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    .bg-1 {
      background-color: var(--dark-1);
    }

    hr {
      border-color: var(--light);
    }

    .price-tier-band {
      color: var(--color-text-alt);
    }
  }

</style>
