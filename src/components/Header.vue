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
      <a href="#/" class="menu-item-link">{{ $t('home.pageTitle') }}</a>
    </div>
    <div class="menu-item">
      <div @click="toggleDropdownMenu($t('workshops.pageTitle'))" class="menu-item-link">
        {{ $t('workshops.pageTitle') }}
      </div>
      <div class="hidden" 
           :class="{ 'dropdown-menu':  dropdownMenuActive($t('workshops.pageTitle'))}">
        <div class="dropdown-menu-item">
          <a href="#/staff" class="menu-item-link">{{ $t('workshops.staff.pageTitle') }}</a>
        </div>
        <div class="dropdown-menu-item">
          <a href="#/schedule" class="menu-item-link">{{ $t('workshops.schedule.pageTitle') }}</a>
        </div>
        <div class="dropdown-menu-item">
          <a href="#/pricing" class="menu-item-link">{{ $t('workshops.pricing.pageTitle') }}</a>
        </div>
      </div>
    </div>
    <div class="menu-item">
      <a href="#/location" class="menu-item-link">{{ $t('location.pageTitle') }}</a>
    </div>
    <div class="menu-item">
      <a href="#/registration" class="menu-item-link">{{ $t('registration.pageTitle') }}</a>
    </div>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>
    </div>
  </header>
</template>

<style scoped>
  #menu {
    display: flex;
    width: 100%;
    background-color: grey;
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
    color: rgb(40, 86, 40);
  }
  .menu-item-link:hover {
    background-color: rgb(90, 90, 90);
    color: rgb(60, 127, 60);    
  }
  .dropdown-menu {
    position: absolute;
    z-index: 100;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    color: rgb(60, 127, 60);
    background: grey;
  }
  .dropdown-menu-item {
    flex: 1 0 40px;
    margin: 0 auto;
  }
  .dropdown-menu-item:hover {
    flex: 1 0 40px;
    width: 100%;
    background-color: rgb(90, 90, 90);
    color: rgb(60, 127, 60);
  }
</style>
