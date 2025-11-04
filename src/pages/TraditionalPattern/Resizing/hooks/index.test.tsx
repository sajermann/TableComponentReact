import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useResizing } from ".";

// Mock the dependencies
vi.mock("~/hooks", () => ({
  useColumns: (columnSize: Record<string, number>) => ({
    columns: [
      { id: "id", size: columnSize.id },
      { id: "name", size: columnSize.name },
    ],
  }),
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:resizing`;

describe("pages/TraditionalPattern/Resizing/hooks", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with default column sizes when localStorage is empty", () => {
    const { result } = renderHook(() => useResizing());

    expect(result.current.columns).toBeDefined();
    expect(Array.isArray(result.current.columns)).toBe(true);
  });

  it("should initialize with saved column sizes from localStorage", () => {
    const savedSizes = {
      id: 150,
      name: 200,
      email: 180,
    };

    localStorage.setItem(IDENTIFIER, JSON.stringify(savedSizes));

    const { result } = renderHook(() => useResizing());

    expect(result.current.columns).toBeDefined();
  });

  it("should save column sizes to localStorage when onResizing is called", () => {
    const { result } = renderHook(() => useResizing());
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    act(() => {
      result.current.onResizing({
        columnSizing: {
          id: 120,
          name: 180,
        },
      });
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      IDENTIFIER,
      expect.stringContaining('"id":120')
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      IDENTIFIER,
      expect.stringContaining('"name":180')
    );

    setItemSpy.mockRestore();
  });

  it("should not update localStorage when onResizing is called with empty object", () => {
    const { result } = renderHook(() => useResizing());
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    act(() => {
      result.current.onResizing({
        columnSizing: {},
      });
    });

    expect(setItemSpy).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });

  it("should merge new sizes with existing sizes in localStorage", () => {
    const initialSizes = {
      id: 100,
      name: 150,
      email: 200,
    };

    localStorage.setItem(IDENTIFIER, JSON.stringify(initialSizes));

    const { result } = renderHook(() => useResizing());

    act(() => {
      result.current.onResizing({
        columnSizing: {
          name: 250,
        },
      });
    });

    const saved = JSON.parse(localStorage.getItem(IDENTIFIER) || "{}");
    expect(saved.id).toBe(100);
    expect(saved.name).toBe(250);
    expect(saved.email).toBe(200);
  });

  it("should remove localStorage item and reload window when handleReset is called", () => {
    localStorage.setItem(IDENTIFIER, JSON.stringify({ id: 100 }));

    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");
    const reloadSpy = vi.fn();

    Object.defineProperty(window, "location", {
      value: { reload: reloadSpy },
      writable: true,
    });

    const { result } = renderHook(() => useResizing());

    act(() => {
      result.current.handleReset();
    });

    expect(removeItemSpy).toHaveBeenCalledWith(IDENTIFIER);
    expect(reloadSpy).toHaveBeenCalled();

    removeItemSpy.mockRestore();
  });

  it("should handle multiple onResizing calls correctly", () => {
    const { result } = renderHook(() => useResizing());

    act(() => {
      result.current.onResizing({
        columnSizing: { id: 110 },
      });
    });

    act(() => {
      result.current.onResizing({
        columnSizing: { name: 220 },
      });
    });

    const saved = JSON.parse(localStorage.getItem(IDENTIFIER) || "{}");
    expect(saved.id).toBe(110);
    expect(saved.name).toBe(220);
  });
});
