import { afterEach, describe, expect, it, vi } from "vitest";
import { showInDevelopment } from "./";

describe("utils/showInDevelopment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return empty object when not in DEV mode", () => {
    vi.stubEnv("DEV", false);
    expect(showInDevelopment({ "data-testid": "test-id" })).toEqual({});
  });

  it("should return the original object when in DEV mode", () => {
    vi.stubEnv("DEV", true);
    expect(showInDevelopment({ "data-testid": "test-id" })).toEqual({
      "data-testid": "test-id",
    });
  });
});
