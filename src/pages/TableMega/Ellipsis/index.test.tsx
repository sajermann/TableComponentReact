/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaEllipsisPage } from ".";

describe("pages/TableMega/TableMegaEllipsisPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaEllipsisPage />
      </InjectorProviders>
    );
  });
});
