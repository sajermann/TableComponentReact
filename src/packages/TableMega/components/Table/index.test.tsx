import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from ".";

describe("packages/TableMega/components/Table", () => {
  it(`should render`, async () => {
    const { getByText } = render(<Table>Test</Table>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
