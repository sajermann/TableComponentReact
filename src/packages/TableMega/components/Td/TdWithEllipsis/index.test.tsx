import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TdWithEllipsis } from "./";

describe("packages/TableMega/components/TdWithEllipsis", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render td and apply title when text overflows", () => {
    // Mock offsetWidth < scrollWidth
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(200);

    const { container, rerender } = render(
      <table>
        <tbody>
          <tr>
            <TdWithEllipsis title="Overflowing text">Cell Content</TdWithEllipsis>
          </tr>
        </tbody>
      </table>
    );

    // Fast-forward timeout to trigger state update and re-render with ref filled
    act(() => {
      vi.runAllTimers();
    });

    rerender(
      <table>
        <tbody>
          <tr>
            <TdWithEllipsis title="Overflowing text">Cell Content</TdWithEllipsis>
          </tr>
        </tbody>
      </table>
    );

    const td = container.querySelector("td");
    expect(td).toHaveAttribute("title", "Overflowing text");
  });

  it("should not apply title when text fits inside cell", () => {
    // Mock offsetWidth >= scrollWidth
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(100);

    const { container, rerender } = render(
      <table>
        <tbody>
          <tr>
            <TdWithEllipsis title="Fits in cell">Cell Content</TdWithEllipsis>
          </tr>
        </tbody>
      </table>
    );

    act(() => {
      vi.runAllTimers();
    });

    rerender(
      <table>
        <tbody>
          <tr>
            <TdWithEllipsis title="Fits in cell">Cell Content</TdWithEllipsis>
          </tr>
        </tbody>
      </table>
    );

    const td = container.querySelector("td");
    expect(td).not.toHaveAttribute("title");
  });
});
