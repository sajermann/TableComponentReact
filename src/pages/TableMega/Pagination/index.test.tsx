/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaPaginationPage } from ".";

describe("pages/TableMega/TableMegaPaginationPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TableMegaPaginationPage />
      </InjectorProviders>
    );
  });
});
