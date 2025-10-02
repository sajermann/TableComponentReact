import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { TdDefaultInternal } from ".";

describe("packages/TableMega/components/TdDefaultInternal", () => {
  it(`should render`, async () => {
    render(<TdDefaultInternal />);
  });
});
