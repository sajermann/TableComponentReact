/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaFooterPage } from ".";

describe("pages/TableMega/TableMegaFooterPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaFooterPage />
      </InjectorProviders>
    );
  });
});
