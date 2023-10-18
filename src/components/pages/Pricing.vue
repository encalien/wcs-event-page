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

    <div id="passPrices" class="grid-container border-bottom">
      <div v-for="(pass, i) in messages.workshops.pricing.passPrices" 
           class="pass-card" :class="{'tier-card': i === 0}">
        <!-- Price info -->
        <h3 class="grid-item grid-center">
          {{ $t(`workshops.pricing.passPrices[${i}].type`) }}
        </h3>
        <div v-for="(tier, j) in pass.tiers" 
             class="grid-item grid-mobile" 
             :class="{'grid-center': i, 'active': activeTierIndex === j}">
          <span class="mobile-only grid-center" :class="{'not-mobile': i === 0}">
            {{ $t(`workshops.pricing.passPrices[0].tiers[${j}]`) }} <br>
            <small>{{ $t(`workshops.pricing.passPrices[0].descriptions[${j}]`) }}</small>
          </span>
          <span class="grid-center" :class="{'not-mobile': i === 0}">
            {{ $t(`workshops.pricing.passPrices[${i}].tiers[${j}]`) }} <br>
            <small v-if="i === 0">{{ $t(`workshops.pricing.passPrices[${i}].descriptions[${j}]`) }}</small>
          </span>
        </div>
        <!-- Pass info -->
        <div class="pass-info">
          <span v-if="pass.extraText" class="important mobile-only">
            {{ $t(`workshops.pricing.passPrices[${i}].extraText`) }}
          </span>
          <span class="mobile-only">
            {{ $t(`workshops.pricing.passPrices[0].includes[0]`) }} <br>
          </span>
          <span v-for="(info, j) in pass.includes">
            {{ $t(`workshops.pricing.passPrices[${i}].includes[${j}]`) }}
          </span>
        </div>
      </div>
      <div v-for="(pass, i) in messages.workshops.pricing.passPrices" 
           class="tier-card not-mobile">
        <span v-if="pass.extraText" class="important">
          {{ $t(`workshops.pricing.passPrices[${i}].extraText`) }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
  #passPrices h3 {
    margin: 0;
  }

  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin: -0.5rem;
    align-items: start;
    padding: 2rem 0;
    gap: 1rem;
  }

  .pass-card {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    margin: 0;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  }

  .tier-card {
    box-shadow: none;
  }

  .pass-info {
    padding: 2rem 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1rem;
    height: 14rem;
  }

  .grid-item {
    padding: 0.5rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .align-left {
    align-items: start;
  }

  .grid-center {
    text-align: center;
  }

  .active {
    background-color: var(--accent-1);
  }


  @media screen and (max-width: 1000px) {
    .pass {
      flex: none;
      width: 100%;
    }

    .pass-info {
      height: min-content;
    }
    
    .grid-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .grid-container.grid-row {
      align-items: end;
    }
    
    .grid-item.grid-mobile {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
    }

    .grid-center {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    
    .align-right {
      text-align: right;
    }
    
    .tier-card {
      display: none;
    }

    .mobile-only {
      display: block;
    }
  }

  @media screen and (max-width: 650px) {
    .grid-item.grid-mobile {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>
