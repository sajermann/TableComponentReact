import { act, render, renderHook, waitFor } from "@testing-library/react";
// __tests__/useChildren.test.tsx
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useWindowSize } from "~/hooks";
import { useChildren } from ".";

// Mock useWindowSize hook
vi.mock("~/hooks", () => ({
  useWindowSize: vi.fn(() => ({ width: 1024, height: 768 })),
}));

describe("components/Button/Children/hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set title to the title prop if provided", () => {
    const { result } = renderHook(() =>
      useChildren({ title: "Custom Title", children: "Some children" })
    );
    expect(result.current.title).toBe("Custom Title");
  });

  // it("should set title to children string if ellipsis is active and no title prop", () => {
  //   // Mock element to simulate overflow (offsetWidth < scrollWidth)
  //   const offsetValues = {
  //     offsetWidth: 50,
  //     scrollWidth: 100,
  //     offsetHeight: 20,
  //     scrollHeight: 20,
  //   };

  //   const { result } = renderHook(() => useChildren({ children: "Long Text" }));

  //   // Mock ref.current with overflowing dimensions
  //   act(() => {
  //     if (result.current.ref.current) {
  //       Object.assign(result.current.ref.current, offsetValues);
  //     } else {
  //       // Manually set the current to a mock object with dimensions
  //       result.current.ref.current = offsetValues as any;
  //     }
  //   });

  //   // Trigger useEffect by changing window size
  //   act(() => {
  //     vi.mocked(useWindowSize).mockReturnValueOnce({
  //       width: 500,
  //       height: 400,
  //     });
  //     result.current.ref.current = offsetValues as any;
  //   });

  //   // Manually trigger the effect by rerendering hook (simulate window resize)
  //   const { rerender } = renderHook(() =>
  //     useChildren({ children: "Long Text" })
  //   );
  //   rerender();

  //   // Result title should now be the children text because ellipsis is active
  //   expect(result.current.title).toBe("Long Text");
  // });

  it("should set title to empty string if no title, children is not string or ellipsis inactive", () => {
    const { result } = renderHook(() =>
      useChildren({ children: <span>Not a string</span> })
    );
    expect(result.current.title).toBe("");
  });
});
