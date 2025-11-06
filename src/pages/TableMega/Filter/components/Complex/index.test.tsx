/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "~/components";
import { SuperFilter } from "~/components/Filter";

import { InjectorProviders } from "~/components";
import { Complex } from ".";

vi.mock("~/components/Input");
vi.mock("~/components/Filter");

describe("pages/TraditionalMega/Filter/components/Complex", () => {
  it(`must render fire on change of input`, async () => {
    vi.mocked(Input).mockImplementation((props) => (
      <input
        data-testid="input-test"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    ));

    const { getByTestId } = render(
      <InjectorProviders>
        <Complex />
      </InjectorProviders>
    );

    const input = getByTestId("input-test");
    fireEvent.change(input, { target: { value: "potato" } });
    expect(input).toHaveValue("potato");
  });

  it(`must render fire on change of super filter`, async () => {
    const spy = vi.fn();
    vi.mocked(SuperFilter).mockImplementation((props) => (
      <input
        {...props}
        data-testid="superfilter-test"
        onChange={(e) => {
          props.onChange?.(e.target.value as any);
          spy(e.target.value);
        }}
      />
    ));
    const { getByTestId } = render(
      <InjectorProviders>
        <Complex />
      </InjectorProviders>
    );
    const input = getByTestId("superfilter-test");
    fireEvent.change(input, { target: { value: "potato" } });
    expect(spy).toBeCalledWith("potato");
  });
});
