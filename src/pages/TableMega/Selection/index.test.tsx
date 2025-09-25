/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaSelectionPage } from ".";

describe("pages/TableMega/TableMegaSelectionPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaSelectionPage />
      </InjectorProviders>
    );
  });
});
