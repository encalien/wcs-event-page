import { describe, expect, it } from "vitest";
import { flushPromises } from "@vue/test-utils";
import App from "@/App.vue";
import { mountWithApp } from "./setup";

describe("App", () => {
  it.each([
    ["/si/schedule", "si"],
    ["/en/schedule", "en"],
    ["/schedule", "en"],
  ])("on %s shows the page in %s", async (path, lang) => {
    const { router, store, i18n } = await mountWithApp(App, "/en/");

    await router.push(path);
    await flushPromises();

    expect(store.state.lang).toBe(lang);
    expect(i18n.global.locale).toBe(lang);
  });

  it("sends visitors of the bare domain to /en", async () => {
    window.history.replaceState(null, "", "/");
    const { router } = await mountWithApp(App, "/");
    await flushPromises();

    expect(router.currentRoute.value.path).toBe("/en");
  });
});
