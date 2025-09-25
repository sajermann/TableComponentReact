/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaColumnVisibilityPage } from ".";

describe("pages/TableMega/TableMegaColumnVisibilityPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaColumnVisibilityPage />
      </InjectorProviders>
    );
  });
});
