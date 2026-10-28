import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { createStore } from "vuex";
import { createRouter, createMemoryHistory } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { Component } from "vue";
import en from "@/i18n/en";
import si from "@/i18n/si";
import { routes } from "@/router";

/** Mounts a component with the same router, store and i18n setup as src/main.ts. */
export async function mountWithApp(component: Component, path = "/en/") {
  const router = createRouter({ history: createMemoryHistory(), routes });
  const store = createStore({
    state: () => ({ lang: "en" }),
    mutations: {
      changeLang(state: { lang: string }, lang: string) {
        state.lang = lang;
      },
    },
  });
  const i18n = createI18n({
    locale: "si",
    fallbackLocale: "en",
    messages: { en, si },
  });

  router.push(path);
  await router.isReady();

  const wrapper = mount(component, {
    global: {
      plugins: [router, store, i18n],
      components: { "font-awesome-icon": FontAwesomeIcon },
    },
  });

  return { wrapper, router, store, i18n };
}
