/**
 * @vitest-environment jsdom
 */

import { render } from "@testing-library/react";
import { it, describe } from "vitest";
import { LoadingBar } from ".";
import { delay } from "~/utils";

describe("Components/LoadingBar", () => {
  it(`should render component`, async () => {
    render(<LoadingBar data-testid="Test" />);
    await delay(500);
  });
});
