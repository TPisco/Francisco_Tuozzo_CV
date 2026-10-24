import { describe, expect, test } from "bun:test";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { getCaseStudySections } from "./case-study";

describe("getCaseStudySections", () => {
  test("a complete project lists its four sections in reading order", () => {
    const sections = getCaseStudySections(en.projects.items.scentory, en.projects.detail);

    expect(sections).toEqual([
      { id: "overview", label: "About the project" },
      { id: "why", label: "Why it matters" },
      { id: "features", label: "Key features" },
      { id: "role", label: "What I built" },
    ]);
  });

  test("a section with nothing in it is left out of the contents", () => {
    const item = { ...en.projects.items.orbital, detail: { ...en.projects.items.orbital.detail, features: [] } };

    const ids = getCaseStudySections(item, en.projects.detail).map((s) => s.id);

    expect(ids).toEqual(["overview", "why", "role"]);
  });

  test("anchors stay the same in every language, only the labels change", () => {
    const english = getCaseStudySections(en.projects.items.phaseshift, en.projects.detail);
    const french = getCaseStudySections(fr.projects.items.phaseshift, fr.projects.detail);

    expect(french.map((s) => s.id)).toEqual(english.map((s) => s.id));
    expect(french[0].label).toBe("À propos du projet");
  });
});
