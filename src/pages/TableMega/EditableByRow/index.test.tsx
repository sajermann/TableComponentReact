/**
 * @vitest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaEditableByRowPage } from ".";

describe("pages/TableMega/TableMegaEditableByRowPage", () => {
  it(`must update row `, async () => {
    const { getByTestId, findByTestId, findByText } = render(
      <InjectorProviders>
        <TableMegaEditableByRowPage />
      </InjectorProviders>
    );
    const updateButton = getByTestId("update-button-0");
    fireEvent.click(updateButton);
    const updateInput = await findByTestId("update-input");
    fireEvent.change(updateInput, { target: { value: "Test" } });
    const saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    const newName = await findByText("Test");
    expect(newName).toBeInTheDocument();
  });

  it(`must cancel update row mode`, async () => {
    const { getByTestId, findByTestId } = render(
      <InjectorProviders>
        <TableMegaEditableByRowPage />
      </InjectorProviders>
    );
    const updateButton = getByTestId("update-button-0");
    fireEvent.click(updateButton);
    const updateInput = await findByTestId("update-input");

    fireEvent.change(updateInput, { target: { value: "Test" } });
    const cancelButton = getByTestId("cancel-button");
    fireEvent.click(cancelButton);
  });
});
