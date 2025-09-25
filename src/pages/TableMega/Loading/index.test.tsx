/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";

import { TableMegaLoadingPage } from ".";

describe("pages/TableMega/TableMegaLoadingPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaLoadingPage />
      </InjectorProviders>
    );
  });
});
