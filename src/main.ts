import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import en from "./i18n/en";
import si from "./i18n/si";

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

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(i18n);
app.mount("#app");
