import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Label } from ".";

describe("packages/TableMega/components/Label", () => {
  it(`should render`, async () => {
    const { getByText } = render(<Label>Test</Label>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
