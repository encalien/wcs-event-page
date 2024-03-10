<script lang="ts">
  export default {
    data() {
      return {
        eventName: import.meta.env.VITE_APP_TITLE,
        openDropdownMenuItem: "",
        isMobileMenuOpen: false,
        shrunk: false
      }
    },
    created () {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
    },
    unmounted () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.shrunk = window.scrollY > 0;
      },
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
      localizationPath(locale : string) {
        return '/' + this.$route.fullPath.replace(/(\/(en|si|fr))/, locale);
      }
    }
  }
</script>

<template>
  <header id="menu" :class="{ 'shrunk': shrunk }">
    <div class="menu-logo" @click="closeAllMenus()">
      <router-link :to="`/${$store.state.lang}/`">
        <img src="/src/assets/images/logo_color_transparent.png" alt="Slovenian Open">
      </router-link>
    </div>
    <div class="menu-inner">
      <div class="menu-inner-content">
        <div class="menu-left">
          <div class="modal-backdrop hidden" 
              :class="{ 'active': isMobileMenuOpen }"
              @click="setMobileMenuOpen(false)"></div>

          <!-- menu items -->
          <div class="menu-small-logo" 
              @click="closeAllMenus()">
            <router-link :to="`/${$store.state.lang}/`" class="logo-link">
              <img src="/src/assets/images/logo_black_transparent.svg" alt="Slovenian Open">
            </router-link>
          </div>
        </div>
        <div class="menu-right">
          <!-- mobile menu toggle -->
          <div id="mobile-menu-toggle" 
              :class="{'block': !isMobileMenuOpen}"
              @click="toggleMobileMenuOpen()">
            <font-awesome-icon icon="fa-solid fa-bars" class="fa menu-item-link"></font-awesome-icon>
          </div>
          <div class="menu-items">
            <div class="menu-item" :class="{ 'active-block': isMobileMenuOpen }">
              <div @click="toggleDropdownMenu($t('workshops.pageTitle'))" 
                  class="menu-item-link dropdown-header" 
                  :class="{ 'active': dropdownMenuActive($t('workshops.pageTitle'))}">
                {{ $t('workshops.pageTitle') }}
              </div>
              <div class="modal-backdrop hidden" 
                  :class="{ 'active': dropdownMenuActive($t('workshops.pageTitle'))}"
                  @click="closeAllMenus()"></div>
              <div class="dropdown-menu hidden" 
                  :class="{ 'active': dropdownMenuActive($t('workshops.pageTitle'))}">
                <div class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/workshops/teachers`" class="menu-item-link">
                    {{ $t('workshops.staff[0].pageTitle') }}
                  </router-link>
                </div>
                <div class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/workshops/levels`" class="menu-item-link">
                    {{ $t('workshops.levels.pageTitle') }}
                  </router-link>
                </div>
                <div class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/team/djs`" class="menu-item-link">
                    {{ $t('workshops.staff[1].pageTitle') }}
                  </router-link>
                </div>
              </div>
            </div>
            <div class="menu-item" 
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
                <router-link :to="`/${$store.state.lang}/workshops/schedule`" 
                            class="menu-item-link dropdown-header">
                  {{ $t('workshops.schedule.pageTitle') }}
                </router-link>
            </div>
            <div class="menu-item" 
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
                <router-link :to="`/${$store.state.lang}/pricing`" 
                            class="menu-item-link dropdown-header">
                  {{ $t('workshops.pricing.pageTitle') }}
                </router-link>
            </div>
            <div class="menu-item" :class="{ 'active-block': isMobileMenuOpen }">
              <div @click="toggleDropdownMenu($t('location.pageTitle'))" 
                  class="menu-item-link dropdown-header" 
                  :class="{ 'active': dropdownMenuActive($t('location.pageTitle'))}">
                {{ $t('location.pageTitle') }}
              </div>
              <div class="modal-backdrop hidden" 
                  :class="{ 'active': dropdownMenuActive($t('location.pageTitle'))}"
                  @click="closeAllMenus()"></div>
              <div class="dropdown-menu hidden"
                  :class="{ 'active': dropdownMenuActive($t('location.pageTitle'))}">
                <div class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/location/venue/main`" 
                              class="menu-item-link">
                    {{ $t('location.venue[0].pageTitle') }}
                  </router-link>
                </div>
                <div class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/location/venue/preparty`" 
                              class="menu-item-link">
                    {{ $t('location.venue[1].pageTitle') }}
                  </router-link>
                </div>
                <div v-if="$store.state.lang !== 'si'" class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/location/slovenia`" class="menu-item-link">{{ $t('location.slovenia.pageTitle') }}</router-link>
                </div>
                <div v-if="$store.state.lang !== 'si'" class="dropdown-menu-item" @click="closeAllMenus()">
                  <router-link :to="`/${$store.state.lang}/location/how-to-get-here`" class="menu-item-link">{{ $t('location.howToGetHere.pageTitle') }}</router-link>
                </div>
              </div>
            </div>
            <div class="menu-item" 
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
              <router-link :to="`/${$store.state.lang}/day-trip`" 
                          class="menu-item-link dropdown-header">
                  {{ $t('dayTrip.pageTitle') }}
              </router-link>
            </div>
            <div class="menu-item" 
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
              <a href="https://forms.gle/5LZA76MxxWSazadZ7" 
                target="_blank" 
                class="menu-item-link dropdown-header">
                {{ $t('registration.pageTitle') }}
              </a>
            </div>
            <div id="social-icons" 
                class="menu-item flex-container flex-container-row" 
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
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
            <div id="localization-menu" 
                class="menu-item flex-container flex-container-row"
                :class="{ 'active': isMobileMenuOpen }"
                @click="closeAllMenus()">
              <div v-for="locale in $i18n.availableLocales" :key="locale">
                <router-link :to="localizationPath(locale)" :class="{ 'active': $i18n.locale === locale }" class="menu-item-link">
                  {{ locale.toUpperCase() }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .menu-inner {
    transition: 200ms top;
    width: 100vw;
    background-color: #fff;
    /* filter: brightness(80%); */
    position: static;
    z-index: 2;
    top: 200px;
    box-shadow: 0px -3px 10px 0px rgba(0,0,0,0.75);
  }
  
  .menu-inner-content {
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: 1rem;
    padding: 0 40px;
    margin: 0 auto;
  }

  #menu.shrunk {
    padding-top: 0;
  }

  #menu.shrunk .menu-inner {
    position: fixed;
    top: 0;
  }

  .menu-small-logo {
    transition: 300ms opacity;
    opacity: 0;
  }

  #menu.shrunk .menu-small-logo {
    opacity: 1;
  }

  .menu-logo {
    background-image: url('/src/assets/images/grad.svg');
    background-repeat: no-repeat;
    background-position: 0 105%;
    background-color: var(--accent-1);
    text-align: center;
  }

  .menu-logo img {
    transition: 300ms height;
    height: 200px;
  }

  .menu-logo a {
    display: block;
  }

  #menu.shrunk .menu-logo img {
    height: 0px;
  }

  .menu-right {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .menu-item {
    text-align: center;
    white-space: nowrap;
  }

  .menu-items {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
  }

  .menu-item-link {
    font-size: 1rem;
    display: block;
    width: 100%;
    padding: 1rem;
    color: var(--color-text-accent);
    filter: brightness(100%);
    cursor: pointer;
  }

  .menu-item-link.dropdown-header {
    padding: 1rem auto;
  }

  .logo-link {
    font-size: 1rem;
    padding: 1rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
    text-transform: uppercase;
  }

  .logo-link > img {
    height: 2rem;
    margin-right: 0.5rem;
  }

  .fa.mobile-item-link {
    padding: 0.8rem;
  }

  .menu-item-link:hover, .dropdown-menu-item:hover, .menu-item-link.active {
    display: block;
    text-decoration: underline;
  }

  .dropdown-menu {
    position: absolute;
    z-index: 2001;
    min-width: 100%;
    flex-direction: column;
    align-items: start;
    background-color: #fff;
    /* border: 1px solid var(--color-background-alt); */
    border-top: none;
  }

  .modal-backdrop {
    position: fixed;
    background-color: transparent;
    width: 150vw;
    height: 100vh;
    left: -100px;
    z-index: 2000;
  }

  .dropdown-menu.active{
    display: flex;
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.2);
  }
  
  .modal-backdrop.active {
    display: flex;
  }
  
  .dropdown-menu-item {
    width: 100%;
    margin: 0 auto;
  }

  .dropdown-menu-item > .menu-item-link {
    padding: 1rem 0.5rem;
  }

  #social-icons {
    margin: 0 2rem;
  }

  #mobile-menu-toggle {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 1.2rem;
    z-index: 2;
  }

  #localization-menu {
    display: flex;
  }

  @media screen and (max-width: 1200px) {
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

    .modal-backdrop.active {
      display: none;
    }

    .menu-item, .menu-small-logo {
      width: 100%;
      flex-basis: 100%;
      display: none;
    }

    .menu-right {
      display: flex;
      width: 100%;
    }

    .menu-left {
      display: none;
    }
    
    .menu-items {
      width: 100%;
      flex-wrap: wrap;
    }

    .active {
      display: flex;
    }

    .dropdown-menu .dropdown-menu-item > a {
      font-size: 0.8rem;
    }

    .dropdown-menu.active{
      box-shadow: none;
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

    #social-icons > .menu-item-link {
      width: fit-content;
    }

    #localization-menu {
      justify-content: right;
    }

    #localization-menu.active {
      justify-content: center;
    }
  }

  @media screen and (max-width: 650px) {
    .menu-logo {
      background-size: 50%;
    }
  }
</style>
