import { describe, expect, it } from "vitest";
import en from "@/i18n/en";
import si from "@/i18n/si";
import SchedulePage from "@/components/pages/SchedulePage.vue";

/** All key paths in a messages object, e.g. "home.pageTitle", "workshops.schedule.days.0.date". */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) => [
    prefix + key,
    ...keyPaths(child, `${prefix}${key}.`),
  ]);
}

describe("translations", () => {
  it("English and Slovenian have the same texts", () => {
    const enKeys = keyPaths(en);
    const siKeys = keyPaths(si);

    expect({
      missingInSlovenian: enKeys.filter((k) => !siKeys.includes(k)),
      missingInEnglish: siKeys.filter((k) => !enKeys.includes(k)),
    }).toEqual({ missingInSlovenian: [], missingInEnglish: [] });
  });

  it("every schedule item has a known type", () => {
    const { eventClasses } = (SchedulePage as any).methods;
    const known = ["party", "audition", "class", "break"];
    const items = (messages: typeof en, lang: string) =>
      messages.workshops.schedule.days.flatMap((day: any) =>
        day.slots.flatMap((slot: any) =>
          slot.items.map((item: any) => ({ lang, time: slot.time, ...item }))
        )
      );

    const unknown = [...items(en, "en"), ...items(si as typeof en, "si")]
      .filter((item) => !known.includes(item.class))
      .map(
        (item) => `${item.lang} ${item.time} "${item.topic}": ${item.class}`
      );

    expect(unknown).toEqual([]);
    expect(new Set(known.map(eventClasses)).size).toBe(known.length);
    expect(eventClasses("something-else")).toBe("bg-light text-body");
  });
});
