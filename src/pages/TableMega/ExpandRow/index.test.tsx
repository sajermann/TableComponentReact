/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaExpandRowPage } from ".";

describe("pages/TableMega/TableMegaExpandRowPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaExpandRowPage />
      </InjectorProviders>
    );
  });
});
