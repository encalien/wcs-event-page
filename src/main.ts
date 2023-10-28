import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createStore } from "vuex";
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";
import HomePage from "./components/pages/HomePage.vue";
import StaffPage from "./components/pages/StaffPage.vue";
import EventLocationPage from "./components/pages/EventLocationPage.vue";
import NotFoundPage from "./components/pages/NotFoundPage.vue";
import SchedulePage from "./components/pages/SchedulePage.vue";
import RegistrationPage from "./components/pages/RegistrationPage.vue";
import PricingPage from "./components/pages/PricingPage.vue";
import TermsAndConditionsPage from "./components/pages/TermsAndConditionsPage.vue";
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

/* add icons to the library */
library.add(faEnvelope, faFacebookF, faInstagram, faBars);

const i18n = createI18n({
  locale: "si",
  fallbackLocale: "en",
  messages: { en, si },
  // something vue-i18n options here ...
});

const routes: any = [
  { path: "/:lang(en|si)/", component: HomePage },
  { path: "/:lang(en|si)/staff", component: StaffPage },
  { path: "/:lang(en|si)/schedule", component: SchedulePage },
  { path: "/:lang(en|si)/pricing", component: PricingPage },
  { path: "/:lang(en|si)/location", component: EventLocationPage },
  { path: "/:lang(en|si)/registration", component: RegistrationPage },
  {
    path: "/:lang(en|si)/terms-and-conditions",
    component: TermsAndConditionsPage,
  },
  { path: "/", component: HomePage },
  { path: "/staff", component: StaffPage },
  { path: "/schedule", component: SchedulePage },
  { path: "/pricing", component: PricingPage },
  { path: "/location", component: EventLocationPage },
  { path: "/registration", component: RegistrationPage },
  { path: "/terms-and-conditions", component: TermsAndConditionsPage },
  { path: "/*", component: NotFoundPage },
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
