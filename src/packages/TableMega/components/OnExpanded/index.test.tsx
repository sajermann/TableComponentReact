import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OnExpanded } from "./";

describe("packages/TableMega/components/OnExpanded", () => {
  it("should return null on render", () => {
    const { container } = render(<OnExpanded>Test</OnExpanded>);
    expect(container.firstChild).toBeNull();
  });
});
