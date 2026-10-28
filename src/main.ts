import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createStore } from "vuex";
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";
import { routes } from "./router";
import { createRouter, createWebHistory } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
