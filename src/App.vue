<script lang="ts">
// Import components
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/pages/Home.vue";
import Staff from "./components/pages/Staff.vue";
import EventLocation from "./components/pages/EventLocation.vue";
import NotFound from "./components/pages/NotFound.vue";
import Schedule from "./components/pages/Schedule.vue";
import Registration from "./components/pages/Registration.vue";
import Pricing from "./components/pages/Pricing.vue";
import TermsAndConditions from "./components/pages/TermsAndConditions.vue";

const routes: any = {
  '/': Home,
  '/staff': Staff,
  '/schedule': Schedule,
  '/pricing': Pricing,
  '/location': EventLocation,
  '/registration': Registration,
  '/terms-and-conditions': TermsAndConditions
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  components: {
    Header,
    Footer,
  },
  created() {
    if (window.location.href.includes('#')) {
      this.$router.replace(`/en${window.location.href.split('#')[1]}`);
      return;
    }

    if (window.location.pathname === "/") {
      this.$router.replace('/en');
    }
  },
  watch:{
    $route() {
      let lang = typeof(this.$route.params.lang) === 'string' ? this.$route.params.lang : 'en';
      this.$store.commit('changeLang', lang);
      this.$i18n.locale = this.$store.state.lang;
      window.scrollTo(0, 0);
    }
  },
  computed: {
  }
}
</script>

<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>

<style scoped>

</style>
