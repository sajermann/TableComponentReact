import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContainerInput } from ".";

describe("packages/TableMega/components/ContainerInput", () => {
  it(`should render`, async () => {
    const { getByText } = render(<ContainerInput>Test</ContainerInput>);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
