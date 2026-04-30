<script lang="ts">
// Import components
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import HomeComponent from "./components/pages/HomeComponent.vue";
import StaffComponent from "./components/pages/StaffComponent.vue";
import EventLocationComponent from "./components/pages/EventLocationComponent.vue";
import NotFoundComponent from "./components/pages/NotFoundComponent.vue";
import ScheduleComponent from "./components/pages/ScheduleComponent.vue";
import RegistrationComponent from "./components/pages/RegistrationComponent.vue";
import PricingComponent from "./components/pages/PricingComponent.vue";
import TermsAndConditionsComponent from "./components/pages/TermsAndConditionsComponent.vue";

const routes: any = {
  "/": HomeComponent,
  "/staff": StaffComponent,
  "/schedule": ScheduleComponent,
  "/pricing": PricingComponent,
  "/location": EventLocationComponent,
  "/registration": RegistrationComponent,
  "/terms-and-conditions": TermsAndConditionsComponent,
};

export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StaffComponent,
    ScheduleComponent,
    PricingComponent,
    EventLocationComponent,
    RegistrationComponent,
    TermsAndConditionsComponent,
    NotFoundComponent,
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"] || NotFoundComponent;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
};
</script>

<template>
  <Header />
  <main>
    <component :is="currentView" />
  </main>
  <Footer />
</template>

<style scoped></style>
