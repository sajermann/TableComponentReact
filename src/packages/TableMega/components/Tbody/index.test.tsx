import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Tbody } from ".";

describe("packages/TableMega/components/Tbody", () => {
  it(`should render`, async () => {
    render(<Tbody />);
  });
});
