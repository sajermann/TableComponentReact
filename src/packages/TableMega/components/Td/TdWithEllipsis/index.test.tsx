import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { TdWithEllipsis } from ".";

describe("packages/TableMega/components/TdWithEllipsis", () => {
  it(`should render`, async () => {
    render(<TdWithEllipsis />);
  });
});
