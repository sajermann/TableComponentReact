/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { InjectorProviders } from "~/components";
import { ExportPage } from ".";

const itemsToTest: Array<"print" | "pdf" | "png" | "excel" | "csv" | "xml"> = [
  "print",
  "pdf",
  "png",
  "excel",
  "csv",
  "xml",
];

describe("Pages/Export", () => {
  for (const item of itemsToTest) {
    it(`should test ${item} button`, async () => {
      const spy = vi.fn();
      const { getByTestId } = render(
        <InjectorProviders>
          <ExportPage />
        </InjectorProviders>
      );
    });
  }
});
