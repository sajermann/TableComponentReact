/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { ColumnVisibilityPage } from ".";

describe("pages/TraditionalPattern/ColumnVisibilityPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <ColumnVisibilityPage />
      </InjectorProviders>
    );
  });
});
