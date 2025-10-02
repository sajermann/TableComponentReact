/**
 * @vitest-environment jsdom
 */

import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { delay } from "~/utils";
import { LoadingBar } from ".";

describe("packages/TableMega/components/LoadingBar", () => {
  it(`should render component`, async () => {
    render(<LoadingBar data-testid="Test" />);
    await delay(500);
  });
});
