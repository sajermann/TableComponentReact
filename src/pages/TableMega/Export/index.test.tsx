/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaExportPage } from ".";

const itemsToTest: Array<"print" | "pdf" | "png" | "excel" | "csv" | "xml"> = [
  "print",
  "pdf",
  "png",
  "excel",
  "csv",
  "xml",
];

describe("pages/TableMega/TableMegaExportPage", () => {
  for (const item of itemsToTest) {
    it(`should test ${item} button`, async () => {
      render(
        <InjectorProviders>
          <TableMegaExportPage />
        </InjectorProviders>
      );
    });
  }
});
