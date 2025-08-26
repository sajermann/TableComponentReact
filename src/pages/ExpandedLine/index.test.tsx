/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { ExpandedLinePage } from ".";

describe("Pages/ExpandedLinePage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <ExpandedLinePage />
      </InjectorProviders>
    );
  });
});
