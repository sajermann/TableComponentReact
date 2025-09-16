/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar } from ".";
import { InjectorProviders } from "../../InjectorProviders";

describe("Components/shared/RoutesConfig/Sidebar", () => {
  it(`should render component`, async () => {
    const { queryByTestId } = render(
      <InjectorProviders>
        <Sidebar />
      </InjectorProviders>
    );

    expect(queryByTestId("aside-sidebar")).not.toBeTruthy();
  });
});
