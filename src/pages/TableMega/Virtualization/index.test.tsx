/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaVirtualizationPage } from ".";

describe("pages/TableMega/TableMegaVirtualizationPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaVirtualizationPage />
      </InjectorProviders>
    );
  });
});
