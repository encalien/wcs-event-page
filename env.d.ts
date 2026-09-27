/// <reference types="vite/client" />

import type { Store } from "vuex";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface RootState {
  readonly lang: string;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}