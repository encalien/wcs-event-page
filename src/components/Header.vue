<script lang="ts">
  export default {
    data() {
      return {
        eventName: import.meta.env.VITE_APP_TITLE,
        openDropdownMenuItem: ""
      }
    },
    methods: {
      toggleDropdownMenu: function (menuItemTitle: string) {
        if (this.openDropdownMenuItem === menuItemTitle) {
          this.openDropdownMenuItem = "";
        } else {
          this.openDropdownMenuItem = menuItemTitle;
        }
      },
      dropdownMenuActive: function (pageTitle: string): boolean {
        return this.openDropdownMenuItem === pageTitle;
      }
    }
  }
</script>

<template>
  <header id="menu">
    <div class="menu-item">
      <a href="#/" class="menu-item-link" @click="toggleDropdownMenu('')">{{ $t('home.pageTitle') }}</a>
    </div>
    <div class="menu-item">
      <div @click="toggleDropdownMenu($t('workshops.pageTitle'))" 
           class="menu-item-link" :class="{ 'active': dropdownMenuActive($t('workshops.pageTitle'))}">
        {{ $t('workshops.pageTitle') }}
      </div>
      <div class="modal-backdrop hidden" 
           :class="{ 'active':  dropdownMenuActive($t('workshops.pageTitle'))}"
           @click="toggleDropdownMenu('')"></div>
      <div class="dropdown-menu hidden" 
           :class="{ 'active':  dropdownMenuActive($t('workshops.pageTitle'))}">
        <div class="dropdown-menu-item" @click="toggleDropdownMenu('')">
          <a href="#/staff" class="menu-item-link">{{ $t('workshops.staff.pageTitle') }}</a>
        </div>
        <div class="dropdown-menu-item" @click="toggleDropdownMenu('')">
          <a href="#/schedule" class="menu-item-link">{{ $t('workshops.schedule.pageTitle') }}</a>
        </div>
        <div class="dropdown-menu-item" @click="toggleDropdownMenu('')">
          <a href="#/pricing" class="menu-item-link">{{ $t('workshops.pricing.pageTitle') }}</a>
        </div>
      </div>
    </div>
    <div class="menu-item">
      <a href="#/location" class="menu-item-link" @click="toggleDropdownMenu('')">{{ $t('location.pageTitle') }}</a>
    </div>
    <div class="menu-item">
      <a href="#/registration" class="menu-item-link" @click="toggleDropdownMenu('')">{{ $t('registration.pageTitle') }}</a>
    </div>
    <div id="social-icons" class="flex-container" @click="toggleDropdownMenu('')">
      <a :href="'mailto:' + $t('contact.email')" class="menu-item-link">
        <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
      </a>
      <a :href="$t('urls.facebook')" target="_blank" class="menu-item-link">
        <font-awesome-icon icon="fa-brands fa-facebook-f"></font-awesome-icon>
      </a>
      <!-- <a :href="$t('urls.instagram')" class="menu-item-link">
        <font-awesome-icon icon="fa-brands fa-instagram"></font-awesome-icon>
      </a> -->
    </div>
    <div id="localization-menu" class="flex-container" @click="toggleDropdownMenu('')">
      <div v-for="locale in $i18n.availableLocales">
        <input v-model="$i18n.locale" type="radio" :id="locale" name="locale" :value="locale" class="hidden">
        <label :for="locale" class="menu-item-link" :class="{ 'active': $i18n.locale === locale }">{{ locale.toUpperCase() }}</label>
      </div>
    </div>
  </header>
</template>

<style scoped>
  #menu {
    display: flex;
    width: 100%;
    background-color: var(--color-background-alt);
    /* filter: brightness(80%); */
    padding: 0 40px;
    position: fixed;
    z-index: 1;
  }

  .menu-item {
    flex: 1 1 100px;
    text-align: center;
  }

  .menu-item-link {
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
    width: 100%;
    padding: 0.5rem;
    color: var(--accent-1);
    filter: brightness(100%);
    cursor: pointer;
  }

  .menu-item-link:hover, .dropdown-menu-item:hover, .menu-item-link.active {
    display: block;
    background-color: var(--accent-1);
    color: var(--dark-1);
  }

  .menu-item-link:visited, .menu-item-link.active {
    filter: brightness(100%);
  }

  .dropdown-menu {
    position: absolute;
    z-index: 2;
    width: 100%;
    flex-direction: column;
    align-items: start;
    background-color: var(--color-background-alt);
    border: 1px solid var(--light);
    border-top: none;
  }

  .modal-backdrop {
    position: fixed;
    background-color: transparent;
    width: 150vw;
    height: 100vh;
    left: -100px;
  }

  .active {
    display: flex;
  }

  .dropdown-menu-item {
    width: 100%;
    margin: 0 auto;
  }

  .dropdown-menu-item-link {
    color: var(--accent-1);
  }

  #social-icons {
    margin: 0 2rem;
  }
</style>
