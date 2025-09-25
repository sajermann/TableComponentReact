/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaFilterPage } from ".";

describe("pages/TableMega/TableMegaFilterPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaFilterPage />
      </InjectorProviders>
    );
  });
});
