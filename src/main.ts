import { createApp } from "vue";
import { createI18n } from 'vue-i18n';
import App from "./App.vue";
import messages from "./i18n/messages";

import "./assets/main.css";

const i18n = createI18n({
  locale: 'si', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // something vue-i18n options here ...
})

const app = createApp(App)

app.use(i18n)
app.mount('#app')
