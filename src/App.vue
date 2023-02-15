<script lang="ts">
// Import components
import Alert from "./components/Alert.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/pages/Home.vue";
import Staff from "./components/pages/Staff.vue";
import EventLocation from "./components/pages/EventLocation.vue";
import NotFound from "./components/pages/NotFound.vue";
import Schedule from "./components/pages/Schedule.vue";
import Registration from "./components/pages/Registration.vue";
import Pricing from "./components/pages/Pricing.vue";

const routes: any = {
  '/': Home,
  '/staff': Staff,
  '/schedule': Schedule,
  '/pricing': Pricing,
  '/location': EventLocation,
  '/registration': Registration,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  components: {
    Alert,
    Header,
    Footer,
    Home,
    Staff,
    Schedule,
    Pricing,
    EventLocation,
    Registration,
    NotFound
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <Header />
  <main>
    <Alert />
    <component :is="currentView" />
  </main>
  <Footer />
</template>

<style scoped>

</style>
