import { describe, expect, it } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { routes } from "@/router";
import HomePage from "@/components/pages/HomePage.vue";
import StaffPage from "@/components/pages/StaffPage.vue";
import SchedulePage from "@/components/pages/SchedulePage.vue";
import PricingPage from "@/components/pages/PricingPage.vue";
import EventLocationPage from "@/components/pages/EventLocationPage.vue";
import RegistrationPage from "@/components/pages/RegistrationPage.vue";
import TermsAndConditionsPage from "@/components/pages/TermsAndConditionsPage.vue";
import NotFoundPage from "@/components/pages/NotFoundPage.vue";

const router = createRouter({ history: createMemoryHistory(), routes });
const pageAt = (path: string) =>
  router.resolve(path).matched[0]?.components?.default;

const pages = {
  "/": HomePage,
  "/staff": StaffPage,
  "/schedule": SchedulePage,
  "/pricing": PricingPage,
  "/location": EventLocationPage,
  "/registration": RegistrationPage,
  "/terms-and-conditions": TermsAndConditionsPage,
};

describe("routes", () => {
  for (const [path, page] of Object.entries(pages)) {
    for (const prefix of ["", "/en", "/si"]) {
      const url = prefix + path;
      it(`${url} shows ${page.__name ?? path}`, () => {
        expect(pageAt(url)).toBe(page);
      });
    }
  }

  it("/en and /si without a trailing slash show the home page", () => {
    expect(pageAt("/en")).toBe(HomePage);
    expect(pageAt("/si")).toBe(HomePage);
  });

  it.each(["/does-not-exist", "/en/does-not-exist", "/de/schedule"])(
    "%s shows the not found page",
    (url) => {
      expect(pageAt(url)).toBe(NotFoundPage);
    }
  );
});
