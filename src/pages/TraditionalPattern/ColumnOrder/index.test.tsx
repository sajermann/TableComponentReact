/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components/InjectorProviders";
import { ColumnOrderPage } from ".";

describe("Pages/Table/ColumnOrderPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <ColumnOrderPage />
      </InjectorProviders>
    );
  });
});
