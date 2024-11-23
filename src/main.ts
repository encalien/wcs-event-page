import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";
import fr from "./i18n/fr";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      lang: "en",
    };
  },
  mutations: {
    changeLang(state, lang) {
      state.lang = lang;
    },
  },
});

import HomeComponent from "./components/pages/HomeComponent.vue";
import StaffComponent from "./components/pages/StaffComponent.vue";
// import NotFoundComponent from "./components/pages/NotFoundComponent.vue";
import ScheduleComponent from "./components/pages/ScheduleComponent.vue";
import PricingComponent from "./components/pages/PricingComponent.vue";
import TermsAndConditionsComponent from "./components/pages/TermsAndConditionsComponent.vue";
import LevelsComponent from "./components/pages/LevelsComponent.vue";
import WSDCComponent from "./components/pages/WSDCComponent.vue";
import EventLocationComponent from "./components/pages/EventLocationComponent.vue";
import SloveniaComponent from "./components/pages/SloveniaComponent.vue";
import HowToGetHereComponent from "./components/pages/HowToGetHereComponent.vue";
import DayTripComponent from "./components/pages/DayTripComponent.vue";

import { createRouter, createWebHistory } from "vue-router";

import "./assets/stylesheets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import RegistrationComponent from "./components/pages/RegistrationComponent.vue";

/* add icons to the library */
library.add(faEnvelope, faFacebookF, faInstagram, faBars);

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { en, si, fr },
});

const routes: any = [
  { path: "/:lang(en|si|fr)/", component: HomeComponent },
  {
    path: "/:lang(en|si|fr)/team",
    component: StaffComponent,
  },
  // {
  //   path: '/:lang(en|si|fr)/team/djs',
  //   component: Staff,
  //   props: { staffIndex: 1 }
  // },
  // {
  //   path: '/:lang(en|si|fr)/team/mc',
  //   component: Staff,
  //   props: { staffIndex: 2 }
  // },
  // {
  //   path: '/:lang(en|si|fr)/team/competitions',
  //   component: Staff,
  //   props: { staffIndex: 3 }
  // },
  { path: "/:lang(en|si|fr)/workshops/levels", component: LevelsComponent },
  { path: "/:lang(en|si|fr)/workshops/wsdc", component: WSDCComponent },
  { path: "/:lang(en|si|fr)/workshops/schedule", component: ScheduleComponent },
  { path: "/:lang(en|si|fr)/pricing", component: PricingComponent },
  {
    path: "/:lang(en|si|fr)/location/venue/main",
    component: EventLocationComponent,
    props: { venueIndex: 0 },
  },
  {
    path: "/:lang(en|si|fr)/location/venue/preparty",
    component: EventLocationComponent,
    props: { venueIndex: 1 },
  },
  { path: "/:lang(en|fr)/location/slovenia", component: SloveniaComponent },
  {
    path: "/:lang(si)/location/slovenia",
    component: EventLocationComponent,
    redirect: "/si/location/venue/main",
  },
  {
    path: "/:lang(en|fr)/location/how-to-get-here",
    component: HowToGetHereComponent,
  },
  {
    path: "/:lang(si)/location/how-to-get-here",
    component: EventLocationComponent,
    redirect: "/si/location/venue/main",
  },
  { path: "/:lang(en|si|fr)/day-trip", component: DayTripComponent },
  {
    path: "/:lang(en|si|fr)/terms-and-conditions",
    component: TermsAndConditionsComponent,
  },
  {
    path: "/:lang(en|si|fr)/registration",
    component: RegistrationComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.config.globalProperties.$store = store;
app.use(store);
app.use(i18n);
app.mount("#app");
