<script lang="ts">
  export default {
    data() {
      return {
        eventName: import.meta.env.VITE_APP_TITLE,
        openDropdownMenuItem: "",
        isMobileMenuOpen: false
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
      },
      toggleMobileMenuOpen: function (): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
      },
      setMobileMenuOpen: function (isOpen: boolean): void {
        this.isMobileMenuOpen = isOpen;
      },
      closeAllMenus: function (): void {
        this.setMobileMenuOpen(false);
        this.toggleDropdownMenu("")
      },
      localizationPath(locale: string) {
        return '/' + this.$route.fullPath.replace(/(\/(en|si))/, locale);
      }
    }
  }
</script>

<template>
  <header id="menu" class="flex-container">
    <!-- mobile menu toggle -->
    <div id="mobile-menu-toggle" 
         :class="{'block': !isMobileMenuOpen}"
         @click="toggleMobileMenuOpen()">
      <font-awesome-icon icon="fa-solid fa-bars" class="fa menu-item-link"></font-awesome-icon>
    </div>
    <div class="modal-backdrop hidden" 
         :class="{ 'active': isMobileMenuOpen }"
         @click="setMobileMenuOpen(false)"></div>

    <!-- menu items -->
    <div class="flex-item menu-item" 
         :class="{ 'active': isMobileMenuOpen }"
         @click="closeAllMenus()">
      <router-link :to="`/${$store.state.lang}/`" class="menu-item-link">
        {{ $t('home.pageTitle') }}
      </router-link>
    </div>
    <div class="flex-item menu-item" :class="{ 'active-block': isMobileMenuOpen }">
      <div @click="toggleDropdownMenu($t('workshops.pageTitle'))" 
           class="menu-item-link" 
           :class="{ 'active': dropdownMenuActive($t('workshops.pageTitle'))}">
        {{ $t('workshops.pageTitle') }}
      </div>
      <div class="modal-backdrop hidden" 
           :class="{ 'active':  dropdownMenuActive($t('workshops.pageTitle'))}"
           @click="closeAllMenus()"></div>
      <div class="dropdown-menu hidden" 
           :class="{ 'active':  dropdownMenuActive($t('workshops.pageTitle'))}">
        <div class="dropdown-menu-item" @click="closeAllMenus()">
          <router-link :to="`/${$store.state.lang}/workshops/teachers`" class="menu-item-link">
            {{ $t('workshops.staff.pageTitle') }}
          </router-link>
        </div>
        <div class="dropdown-menu-item" @click="closeAllMenus()">
          <router-link :to="`/${$store.state.lang}/workshops/schedule`" class="menu-item-link">
            {{ $t('workshops.schedule.pageTitle') }}
          </router-link>
        </div>
        <div class="dropdown-menu-item" @click="closeAllMenus()">
          <router-link :to="`/${$store.state.lang}/pricing`" class="menu-item-link">
            {{ $t('workshops.pricing.pageTitle') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex-item menu-item" 
         :class="{ 'active': isMobileMenuOpen }"
         @click="closeAllMenus()">
      <router-link :to="`/${$store.state.lang}/location`" class="menu-item-link">
        {{ $t('location.pageTitle') }}
      </router-link>
    </div>
    <div class="flex-item menu-item" 
         :class="{ 'active': isMobileMenuOpen }"
         @click="closeAllMenus()">
      <router-link :to="`/${$store.state.lang}/registration`" class="menu-item-link">
        {{ $t('registration.pageTitle') }}
      </router-link>
    </div>
    <div id="social-icons" 
         class="menu-item flex-container flex-container-row" 
         :class="{ 'active': isMobileMenuOpen }"
         @click="closeAllMenus()">
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
    <div id="localization-menu" 
         class="menu-item flex-container flex-container-row"
         :class="{ 'active': isMobileMenuOpen }"
         @click="closeAllMenus()">
      <div v-for="locale in $i18n.availableLocales" class="flex-item" :key="locale">
        <router-link :to="localizationPath(locale)" :class="{ 'active': $i18n.locale === locale }"
                     class="menu-item-link">
          {{ locale.toUpperCase() }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
  #menu {
    width: 100vw;
    background-color: var(--color-background-alt);
    /* filter: brightness(80%); */
    padding: 0 40px;
    position: fixed;
    z-index: 1;
  }

  .menu-item {
    text-align: center;
  }
  
  .menu-item.flex-item {
    flex: 1 1 20%;
    padding: 0;
  }

  .menu-item-link {
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
    width: 100%;
    padding: 0.5rem;
    color: var(--color-text-accent);
    filter: brightness(100%);
    cursor: pointer;
  }

  .fa.mobile-item-link {
    padding: 0.8rem;
  }

  .menu-item-link:hover, .dropdown-menu-item:hover, .menu-item-link.active {
    display: block;
    background-color: var(--color-text-accent);
    color: var(--color-background-alt);
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
    color: var(--color-text-accent);
  }

  #social-icons {
    margin: 0 2rem;
  }

  #social-icons > .flex-item {
    flex: 1 0 50%;
  }

  #mobile-menu-toggle {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 1.2rem;
    z-index: 1;
  }

  #localization-menu > .flex-item {
    padding: 0;
  }

  @media screen and (max-width: 650px) {
  .dropdown-menu {
    position: relative;
    border: none;
  }
  .dropdown-menu-item > a {
    font-size: 1rem;
  }

  #mobile-menu-toggle {
    display: block;
  }

  .modal-backdrop {
    top: 0;
  }

  .menu-item {
    display: none;
  }
  
  .menu-item.flex-item {
    width: 100%;
  }

  .active {
    display: flex;
  }

  .active-block {
    display: block;
  }

  #mobile-menu-toggle.block {
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: left;
  }

  #mobile-menu-toggle > .menu-item-link {
    width: 1.2rem;
  }
}
</style>
