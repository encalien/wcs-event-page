import HomePage from "./components/pages/HomePage.vue";
import StaffPage from "./components/pages/StaffPage.vue";
import EventLocationPage from "./components/pages/EventLocationPage.vue";
import NotFoundPage from "./components/pages/NotFoundPage.vue";
import SchedulePage from "./components/pages/SchedulePage.vue";
import RegistrationPage from "./components/pages/RegistrationPage.vue";
import PricingPage from "./components/pages/PricingPage.vue";
import TermsAndConditionsPage from "./components/pages/TermsAndConditionsPage.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  { path: "/:lang(en|si)/", component: HomePage },
  { path: "/:lang(en|si)/staff", component: StaffPage },
  { path: "/:lang(en|si)/schedule", component: SchedulePage },
  { path: "/:lang(en|si)/pricing", component: PricingPage },
  { path: "/:lang(en|si)/location", component: EventLocationPage },
  { path: "/:lang(en|si)/registration", component: RegistrationPage },
  {
    path: "/:lang(en|si)/terms-and-conditions",
    component: TermsAndConditionsPage,
  },
  { path: "/", component: HomePage },
  { path: "/staff", component: StaffPage },
  { path: "/schedule", component: SchedulePage },
  { path: "/pricing", component: PricingPage },
  { path: "/location", component: EventLocationPage },
  { path: "/registration", component: RegistrationPage },
  { path: "/terms-and-conditions", component: TermsAndConditionsPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];
