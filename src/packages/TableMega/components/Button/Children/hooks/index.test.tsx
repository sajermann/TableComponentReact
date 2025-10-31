import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useChildren } from ".";

// Mock useWindowSize hook
vi.mock("~/hooks", () => ({
  useWindowSize: vi.fn(() => ({ width: 1024, height: 768 })),
}));

describe("packages/Table/components/Button/Children/hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set title to the title prop if provided", () => {
    const { result } = renderHook(() =>
      useChildren({ title: "Custom Title", children: "Some children" })
    );
    expect(result.current.title).toBe("Custom Title");
  });

  it("should set title to empty string if no title, children is not string or ellipsis inactive", () => {
    const { result } = renderHook(() =>
      useChildren({ children: <span>Not a string</span> })
    );
    expect(result.current.title).toBe("");
  });
});
