<script lang="ts">
type NavItem = {
  path: string;
  labelKey: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    path: "",
    labelKey: "home.pageTitle",
  },
  {
    path: "staff",
    labelKey: "workshops.staff.pageTitle",
  },
  {
    path: "schedule",
    labelKey: "workshops.schedule.pageTitle",
  },
  {
    path: "pricing",
    labelKey: "workshops.pricing.pageTitle",
  },
  {
    path: "location",
    labelKey: "location.pageTitle",
  },
  {
    path: "registration",
    labelKey: "registration.pageTitle",
  },
];

export default {
  data() {
    return {
      navItems: NAV_ITEMS,
      isMobileMenuOpen: false,
    };
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },

    navPath(path: string) {
      const base = `/${this.$store.state.lang}`;

      return path ? `${base}/${path}` : `${base}/`;
    },

    localizationPath(locale: string) {
      const path = this.$route.fullPath;

      if (/^\/(en|si)(?=\/|$)/.test(path)) {
        return path.replace(/^\/(en|si)(?=\/|$)/, `/${locale}`);
      }

      return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
    },
  },
};
</script>

<template>
  <header class="bg-primary sticky-top">
    <nav
      class="navbar navbar-expand-md navbar-dark w-100 mx-auto p-0"
      style="max-width: 1200px"
      aria-label="Main navigation"
    >
      <div class="container-fluid px-0">
        <!-- Mobile toggle -->
        <button
          class="navbar-toggler border-0 shadow-none m-2"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation"
          @click="toggleMobileMenu"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>

        <!-- Navigation -->
        <div
          class="w-100 d-md-block"
          :class="isMobileMenuOpen ? 'd-block' : 'd-none'"
        >
          <ul
            class="navbar-nav flex-column flex-md-row w-100 align-items-stretch"
          >
            <!-- Main links -->
            <li
              v-for="item in navItems"
              :key="item.path"
              class="nav-item flex-md-fill text-md-center"
            >
              <router-link
                :to="navPath(item.path)"
                class="nav-link menu-link fw-bold px-3 py-2 h-100 d-flex align-items-center justify-content-md-center"
                :class="[
                  $route.path === navPath(item.path)
                    ? 'bg-light text-primary'
                    : 'text-light',
                ]"
                @click="closeMobileMenu"
              >
                {{ $t(item.labelKey) }}
              </router-link>
            </li>

            <!-- Social -->
            <li
              class="nav-item d-flex align-items-stretch justify-content-start justify-content-md-center flex-md-shrink-0"
            >
              <a
                :href="'mailto:' + $t('contact.email')"
                class="nav-link menu-link text-white d-flex align-items-center justify-content-center px-3 py-3"
                aria-label="Email"
              >
                <font-awesome-icon icon="fa-regular fa-envelope" />
              </a>

              <a
                :href="$t('urls.facebook')"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-link menu-link text-white d-flex align-items-center justify-content-center px-3 py-3"
                aria-label="Facebook"
              >
                <font-awesome-icon icon="fa-brands fa-facebook-f" />
              </a>
            </li>

            <!-- Languages -->
            <li
              class="nav-item d-flex align-items-stretch justify-content-start justify-content-md-center flex-md-shrink-0"
            >
              <router-link
                v-for="locale in $i18n.availableLocales"
                :key="locale"
                :to="localizationPath(locale)"
                class="nav-link menu-link fw-bold px-3 py-3 d-flex align-items-center justify-content-center"
                :class="
                  $i18n.locale === locale
                    ? 'bg-light text-primary'
                    : 'text-light'
                "
                @click="closeMobileMenu"
              >
                {{ locale.toUpperCase() }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.menu-link:hover,
.menu-link:active,
.menu-link:focus,
.menu-link:focus-visible {
  background-color: var(--bs-light) !important;
  color: var(--bs-primary) !important;
  filter: brightness(100%);
}
</style>
