/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { t } from "i18next";
import { describe, expect, it, vi } from "vitest";

import { SuperFilter } from ".";

describe("components/Filter/SuperFilter", () => {
  it(`must add filter and remove`, async () => {
    const mock = vi.fn();
    const spy = (e: any) => {
      if (e[0]) {
        return mock(e[0].value);
      }
      return mock([]);
    };
    const { getByTestId, getByLabelText, getByText } = render(
      <SuperFilter onChange={spy} />
    );
    const buttonOpen = getByText(t("SUPER_FILTER"));
    fireEvent.click(buttonOpen);

    const inputValue = getByLabelText(t("VALUE"));
    fireEvent.change(inputValue, { target: { value: "1" } });

    const buttonAdd = getByText(t("ADD"));
    fireEvent.click(buttonAdd);

    const buttonConfirm = getByText(t("CONFIRM"));
    fireEvent.click(buttonConfirm);

    expect(mock).toBeCalledWith("1");

    fireEvent.click(buttonOpen);
    const removeButton = getByTestId("action-button-1");
    fireEvent.click(removeButton);
    fireEvent.click(buttonConfirm);
  });
});
