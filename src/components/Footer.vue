<script lang="ts">
  export default {

  }
</script>

<template>
  <footer id="footer">
    <div class="footer-item">
      <router-link :to="`/${$store.state.lang}/terms-and-conditions`">
        {{ $t('termsAndConditions.pageTitle') }}
      </router-link>
    </div>
    <div class="footer-item">
      <p>{{ $t('contact.text') }}</p>
      <p><a :href="'mailto:' + $t('contact.email')">{{ $t('contact.email') }}</a></p>
    </div>
    <!-- <div class="footer-item">
      <p>{{ $t('event.name') }} &copy;2024</p>
    </div> -->
    <div class="footer-item flex-container">
      <a target="_blank" :href="'mailto:' + $t('contact.email')" class="menu-item-link">
        <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
      </a>
      <a target="_blank" :href="$t('urls.facebook')" class="menu-item-link">
        <font-awesome-icon icon="fa-brands fa-facebook-f"></font-awesome-icon>
      </a>
      <a target="_blank" :href="$t('urls.instagram')" class="menu-item-link">
        <font-awesome-icon icon="fa-brands fa-instagram"></font-awesome-icon>
      </a>
    </div>

  </footer>
</template>

<style scoped>
  #footer {
    width: 100%;
    padding: 3rem 1rem;
    background-color: var(--color-background-alt);
    color: var(--color-text-alt);
    margin-top: auto;
  }

  .footer-item {
    text-align: center;
    margin: 2rem auto;
  }

  .footer-item > p {
    margin-bottom: 0;
  }

  .footer-item a {
    text-decoration: none;
    color: var(--accent-2);
  }

  .footer-item.flex-container {
    gap: 1rem;
  }

  @media screen and (max-width: 650px) {
    .footer-item.flex-container {
      flex-direction: row;
      gap: 1rem;
    }
  }
</style>
