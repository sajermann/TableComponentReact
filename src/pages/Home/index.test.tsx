/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";
import { Home } from ".";

describe("Pages/Home", () => {
  it(`must change Select components`, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <Home />
      </InjectorProviders>
    );
    const text = await getAllByText(/welcome/i)[0];
    expect(text).toBeInTheDocument();
  });
});
