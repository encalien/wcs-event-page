import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";
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
import EventLocationComponent from "./components/pages/EventLocationComponent.vue";
import NotFoundComponent from "./components/pages/NotFoundComponent.vue";
import ScheduleComponent from "./components/pages/ScheduleComponent.vue";
import RegistrationComponent from "./components/pages/RegistrationComponent.vue";
import PricingComponent from "./components/pages/PricingComponent.vue";
import TermsAndConditionsComponent from "./components/pages/TermsAndConditionsComponent.vue";

import { createRouter, createWebHistory } from "vue-router";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faEnvelope, faFacebookF, faInstagram, faBars);

const i18n = createI18n({
  locale: "si",
  fallbackLocale: "en",
  messages: { en, si },
  // something vue-i18n options here ...
});

const routes: any = [
  { path: "/:lang(en|si)/", component: HomeComponent },
  { path: "/:lang(en|si)/workshops/teachers", component: StaffComponent },
  { path: "/:lang(en|si)/workshops/schedule", component: ScheduleComponent },
  { path: "/:lang(en|si)/pricing", component: PricingComponent },
  { path: "/:lang(en|si)/location", component: EventLocationComponent },
  { path: "/:lang(en|si)/registration", component: RegistrationComponent },
  {
    path: "/:lang(en|si)/terms-and-conditions",
    component: TermsAndConditionsComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
