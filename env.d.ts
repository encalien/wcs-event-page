/// <reference types="vite/client" />

import type { Store } from "vuex";
import type {} from "vue-i18n"; // loads $t/$i18n types (vue-i18n is only imported via vue-lang-router)

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface RootState {
  readonly lang: string;
}

declare module "vue" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
