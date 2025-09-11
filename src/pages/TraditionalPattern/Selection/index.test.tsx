/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { SelectionPage } from ".";

describe("Pages/Table/SelectionPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <SelectionPage />
      </InjectorProviders>
    );
  });
});
