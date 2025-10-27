import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Resizing } from ".";
import { onResizing } from "./utils";

// Mock do onResizing
vi.mock("./utils");

describe("pages/TableMega/Resizing/components/Resizing", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("dont render it getCanResize is false", () => {
    const header = { column: { getCanResize: () => false } } as any;

    const { container } = render(
      <Resizing header={header} table={{} as any} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should test timeout", async () => {
    const spy = vi.fn();
    vi.mocked(onResizing).mockImplementation(spy);
    const mock = {
      id: "test",
      size: 10,
    };
    const table = {
      getState: () => ({
        columnSizing: mock,
      }),
    } as any;

    const header = {
      getResizeHandler: vi.fn,
      column: { getIsResizing: () => true, getCanResize: () => true },
    } as any;

    const { container } = render(<Resizing header={header} table={table} />);
    const resizer = container?.querySelector("div");
    expect(resizer).toBeTruthy();
    expect(resizer?.className).toContain("resizer");
    expect(resizer?.className).not.toContain("is-resizing");

    // Avança o tempo para disparar useEffect
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalledWith({
      columnSizing: mock,
    });
  });

  it("clear timeout in unmmount", () => {
    const table = {
      getState: () => ({
        columnSizing: 1,
      }),
    } as any;

    const header = {
      getResizeHandler: vi.fn,
      column: { getIsResizing: () => true, getCanResize: () => true },
    } as any;

    const { unmount } = render(<Resizing header={header} table={table} />);
    unmount();
  });
});
