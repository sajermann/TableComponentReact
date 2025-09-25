/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components/InjectorProviders";
import { ColumnOrderPage } from ".";

describe("pages/TraditionalPattern/ColumnOrderPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <ColumnOrderPage />
      </InjectorProviders>
    );
  });
});
