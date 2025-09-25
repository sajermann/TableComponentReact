/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaFullEditablePage } from ".";

describe("pages/TableMega/TableMegaFullEditablePage", () => {
  it(`must update data`, async () => {
    const { getByText, getByTestId } = render(
      <InjectorProviders>
        <TableMegaFullEditablePage />
      </InjectorProviders>
    );
    // screen.logTestingPlaygroundURL();
    const inputName = getByTestId("input-name-0");
    fireEvent.change(inputName, { target: { value: "Test" } });
    expect(getByText(/"name": "Test",/g)).toBeTruthy();

    const inputLastName = getByTestId("input-lastName-0");
    fireEvent.change(inputLastName, { target: { value: "Test" } });
    expect(getByText(/"lastName": "Test",/g)).toBeTruthy();

    fireEvent.click(getByTestId("checkbox-isActive-0")); // Line coverage
  });
});
