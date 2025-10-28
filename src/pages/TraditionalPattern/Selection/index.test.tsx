/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { SelectionPage } from ".";

describe("pages/TraditionalPattern/SelectionPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <SelectionPage />
      </InjectorProviders>
    );
  });
});
