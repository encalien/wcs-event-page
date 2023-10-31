import { createApp } from "vue";
import { createI18n } from 'vue-i18n';
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";
import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      lang: 'en'
    }
  },
  mutations: {
    changeLang(state, lang) {
      state.lang = lang;
    }
  }
})

import Home from "./components/pages/Home.vue";
import Staff from "./components/pages/Staff.vue";
import EventLocation from "./components/pages/EventLocation.vue";
import NotFound from "./components/pages/NotFound.vue";
import Schedule from "./components/pages/Schedule.vue";
import Registration from "./components/pages/Registration.vue";
import Pricing from "./components/pages/Pricing.vue";
import TermsAndConditions from "./components/pages/TermsAndConditions.vue";
import Levels from "./components/pages/Levels.vue";
import Slovenia from "./components/pages/Slovenia.vue";

import { createRouter, createWebHistory } from 'vue-router';

import "./assets/stylesheets/main.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEnvelope, faFacebookF, faInstagram, faBars)

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, si }
  // something vue-i18n options here ...
})

const routes: any = [
  { path: '/:lang(en|si)/', component: Home, },
  { path: '/:lang(en|si)/workshops/teachers', component: Staff, },
  { path: '/:lang(en|si)/workshops/levels', component: Levels, },
  { path: '/:lang(en|si)/workshops/schedule', component: Schedule, },
  { path: '/:lang(en|si)/pricing', component: Pricing, },
  { path: '/:lang(en|si)/location/slovenia', component: Slovenia, },
  { path: '/:lang(en|si)/location/venue', component: EventLocation, },
  //{ path: ':lang(en|si)/registration', component: Registration, },
  { path: '/:lang(en|si)/terms-and-conditions', component: TermsAndConditions },
  { path: '/', component: Home, },
  { path: '/workshops/teachers', component: Staff, },
  { path: '/workshops/levels', component: Levels, },
  { path: '/workshops/schedule', component: Schedule, },
  { path: '/pricing', component: Pricing, },
  { path: '/location/slovenia', component: Slovenia, },
  { path: '/location/venue', component: EventLocation, },
  //{ path: '/registration', component: Registration, },
  { path: '/terms-and-conditions', component: TermsAndConditions }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
