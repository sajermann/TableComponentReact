import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoadingBar } from "./";

vi.mock("../../hooks", () => ({
  useTableMega: () => ({
    table: {
      getVisibleFlatColumns: () => [{}, {}, {}],
    },
  }),
}));

describe("packages/TableMega/components/LoadingBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return null when show is falsy", () => {
    const { container } = render(
      <table>
        <tbody>
          <LoadingBar show={false} />
        </tbody>
      </table>
    );
    expect(container.querySelector("th")).toBeNull();
  });

  it("should render loading bar and advance progress animation through interval callback", () => {
    let intervalCallback: (() => void) | null = null;
    vi.spyOn(window, "setInterval").mockImplementation(((fn: () => void) => {
      intervalCallback = fn;
      return 123 as any;
    }) as any);
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    const { container, rerender } = render(
      <table>
        <tbody>
          <LoadingBar
            show={true}
            external={{ className: "custom-external" }}
            internal={{ className: "custom-internal" }}
          />
        </tbody>
      </table>
    );

    const th = container.querySelector("th");
    expect(th).toBeInTheDocument();
    expect(th).toHaveAttribute("colSpan", "3");

    // Manually trigger interval callback to advance customWidth past 99 and reset
    expect(intervalCallback).not.toBeNull();
    act(() => {
      for (let i = 0; i < 35; i++) {
        intervalCallback?.();
      }
    });

    // Rerender with show=false to trigger clearInterval
    rerender(
      <table>
        <tbody>
          <LoadingBar show={false} />
        </tbody>
      </table>
    );

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(container.querySelector("th")).toBeNull();
  });
});
