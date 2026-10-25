import { describe, expect, test } from "bun:test";
import { linkLabel } from "./links";

describe("linkLabel", () => {
  test("a profile URL reads as its domain and path", () => {
    expect(linkLabel("https://github.com/TPisco")).toBe("github.com/TPisco");
  });

  test("www and a trailing slash are dropped", () => {
    expect(linkLabel("https://www.linkedin.com/in/francisco-tuozzo-0b47943b2/")).toBe(
      "linkedin.com/in/francisco-tuozzo-0b47943b2",
    );
  });

  test("an email link reads as the address", () => {
    expect(linkLabel("mailto:franciscotuozzo@gmail.com")).toBe("franciscotuozzo@gmail.com");
  });
});
