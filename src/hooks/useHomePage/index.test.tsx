// useHomePage.test.tsx

import { useLocation } from "@tanstack/react-router";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { store, useHomePage } from "."; // Adjust the import path

// Simulate Vite's import.meta.env for testing purposes
beforeEach(() => {
  // @ts-ignore
  import.meta.env = { VITE_URL_BASENAME: "testbase" };
});

vi.mock("@tanstack/react-router");
describe("hooks/useHomePage", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    store.setState({ isHomePage: true });
  });

  it("should set isHomePage to true when location.hash matches HOME_URL", () => {
    // Arrange: set location.hash to match HOME_URL
    vi.mocked(useLocation).mockImplementation(
      () =>
        ({
          hash: "#/",
        }) as any
    );

    // Act: render hook
    const { result } = renderHook(() => useHomePage());

    // Assert
    expect(result.current.isHomePage).toBe(true);
  });

  it("should set isHomePage to false when location.hash does not match HOME_URL", () => {
    vi.mocked(useLocation).mockImplementation(
      () =>
        ({
          hash: "#/not-home",
        }) as any
    );
    const { result } = renderHook(() => useHomePage());
    expect(result.current.isHomePage).toBe(false);
  });

  it("should initialize isHomePage as true in the Zustand store", () => {
    // Directly access the Zustand store value
    expect(store.getState().isHomePage).toBe(true);
  });

  it("should allow manual update of isHomePage via setIsHomePage", () => {
    act(() => {
      store.getState().setIsHomePage(false);
    });
    expect(store.getState().isHomePage).toBe(false);
  });
});
