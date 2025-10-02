import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Input } from ".";

describe("packages/TableMega/components/Input", () => {
  it(`should render`, async () => {
    render(<Input value="test" />);
  });
});
