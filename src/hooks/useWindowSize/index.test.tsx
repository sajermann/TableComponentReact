import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useWindowSize } from ".";

describe("hooks/useWindowSize", () => {
  it("returns current window size initially and updates on resize", () => {
    // Set initial window size
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    // Initial size matches window
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    act(() => {
      // Change window size
      window.innerWidth = 800;
      window.innerHeight = 600;
      // Trigger resize event
      window.dispatchEvent(new Event("resize"));
    });

    // Hook state updates after resize
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it("cleans up event listener on unmount", () => {
    const addListenerSpy = vi.spyOn(window, "addEventListener");
    const removeListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWindowSize());

    expect(addListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    addListenerSpy.mockRestore();
    removeListenerSpy.mockRestore();
  });
});
