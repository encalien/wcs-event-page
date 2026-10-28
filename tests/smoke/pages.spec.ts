import { expect, test, type Page } from "@playwright/test";
import eventConfig from "../../src/event.config";

const pages = [
  "/",
  "/staff",
  "/schedule",
  "/pricing",
  "/location",
  "/registration",
  "/terms-and-conditions",
];

/** Collects JS errors and failed requests to our own server while the page loads. */
function watchForErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`JS error: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (r.url().startsWith("http://localhost") && r.status() >= 400)
      errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

for (const lang of ["en", "si"]) {
  for (const path of pages) {
    const url = `/${lang}${path === "/" ? "/" : path}`;

    test(`${url} loads`, async ({ page }) => {
      const errors = watchForErrors(page);
      await page.goto(url);

      await expect(page.locator("header nav")).toBeVisible();
      await expect(page.locator("main")).not.toBeEmpty();
      await expect(page.locator("footer")).toBeAttached();
      await expect(page.locator("main")).not.toContainText(
        /404|[a-z]+\.[a-z]+\.[a-zA-Z]+/,
        {
          // raw i18n keys such as "home.aboutWCS.title" mean a missing text
          useInnerText: true,
        }
      );
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }
}

test("page title and share tags come from event.config.ts", async ({
  page,
}) => {
  await page.goto("/en/");
  await expect(page).toHaveTitle(eventConfig.title);
  const html = await page.content();
  expect(html).not.toContain("%EVENT_");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    eventConfig.ogImage
  );
});

test("event images exist", async ({ request }) => {
  for (const image of [
    eventConfig.ogImage,
    eventConfig.heroImage,
    eventConfig.heroImageMobile,
  ]) {
    const response = await request.get(image);
    expect(response.status(), image).toBe(200);
    expect(response.headers()["content-type"], image).toMatch(/^image\//);
  }
});

test("the bare domain opens the English home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("main")).not.toBeEmpty();
});

test("unknown pages show the not found page", async ({ page }) => {
  await page.goto("/en/does-not-exist");
  await expect(page.locator("main h1")).toContainText("404");
});

test("language switch keeps you on the same page", async ({ page }) => {
  await page.goto("/en/schedule");
  const menuButton = page.locator("button.navbar-toggler");
  if (await menuButton.isVisible()) await menuButton.click();
  await page.getByRole("link", { name: "SI", exact: true }).click();
  await expect(page).toHaveURL(/\/si\/schedule$/);
  await expect(page.locator("html")).toBeAttached();
});

test("registration form is usable", async ({ page }) => {
  await page.goto("/en/registration");
  for (const id of ["#firstName", "#lastName", "#email", "#terms"]) {
    await expect(page.locator(id)).toBeEditable();
  }
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
});
