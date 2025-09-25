/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaResizingPage } from ".";

describe("pages/TableMega/TableMegaResizingPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaResizingPage />
      </InjectorProviders>
    );
  });
});
