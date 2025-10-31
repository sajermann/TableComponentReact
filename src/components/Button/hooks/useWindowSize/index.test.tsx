import { beforeEach, describe, expect, it } from "vitest";

import { renderHook } from "@testing-library/react";
import { useWindowSize } from "./";

describe("components/Button/hooks/useWindowSize", () => {
  // Mock the window object
  beforeEach(() => {
    // Set initial window dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it("should initialize with current window size", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("should update size on window resize", () => {
    // Trigger resize event
    window.innerWidth = 800;
    window.innerHeight = 600;
    window.dispatchEvent(new Event("resize"));
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});
