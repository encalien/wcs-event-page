import { describe, expect, it } from "vitest";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { mountWithApp } from "./setup";

const navLinks = (
  wrapper: Awaited<ReturnType<typeof mountWithApp>>["wrapper"]
) =>
  wrapper
    .findAll("a.nav-link")
    .filter((a) => a.attributes("href")?.startsWith("/"));

describe("HeaderComponent", () => {
  it("links every page in the current language", async () => {
    const { wrapper, store } = await mountWithApp(HeaderComponent, "/si/");
    store.commit("changeLang", "si");
    await wrapper.vm.$nextTick();

    const hrefs = navLinks(wrapper).map((a) => a.attributes("href"));

    expect(hrefs).toEqual([
      "/si/",
      "/si/staff",
      "/si/schedule",
      "/si/pricing",
      "/si/location",
      "/si/registration",
      "/en/",
      "/si/",
    ]);
  });

  it.each([
    ["/en/schedule", "/si/schedule"],
    ["/si/schedule", "/si/schedule"],
    ["/en/", "/si/"],
    ["/en", "/si"],
    ["/schedule", "/si/schedule"],
    ["/", "/si/"],
  ])("language switch on %s links to %s", async (from, to) => {
    const { wrapper } = await mountWithApp(HeaderComponent, from);

    const si = navLinks(wrapper).find((a) => a.text() === "SI");

    expect(si?.attributes("href")).toBe(to);
  });

  it("does not touch paths that only start with a language code", async () => {
    const { wrapper } = await mountWithApp(HeaderComponent, "/sinfo");

    const en = navLinks(wrapper).find((a) => a.text() === "EN");

    expect(en?.attributes("href")).toBe("/en/sinfo");
  });

  it("highlights the current page", async () => {
    const { wrapper } = await mountWithApp(HeaderComponent, "/en/pricing");

    const active = navLinks(wrapper).filter((a) => a.classes("bg-light"));

    expect(active.map((a) => a.attributes("href"))).toContain("/en/pricing");
    expect(active.map((a) => a.attributes("href"))).not.toContain("/en/");
  });

  it("opens the mobile menu and closes it after a link is clicked", async () => {
    const { wrapper } = await mountWithApp(HeaderComponent);
    const menu = () => wrapper.find("nav .w-100");

    expect(menu().classes()).toContain("d-none");
    await wrapper.find("button.navbar-toggler").trigger("click");
    expect(menu().classes()).toContain("d-block");
    expect(
      wrapper.find("button.navbar-toggler").attributes("aria-expanded")
    ).toBe("true");

    await navLinks(wrapper)[1].trigger("click");
    expect(menu().classes()).toContain("d-none");
  });
});
