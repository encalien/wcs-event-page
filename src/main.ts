import { createApp } from "vue";
import { createI18n } from 'vue-i18n';
import App from "./App.vue";
import messages from "./i18n/messages";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faEnvelope, faFacebookF, faInstagram)

const i18n = createI18n({
  locale: 'si', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // something vue-i18n options here ...
})

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)

app.use(i18n)
app.mount('#app')
