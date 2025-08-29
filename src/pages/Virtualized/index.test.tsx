/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";

import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { VirtualizedPage } from ".";

describe("Pages/Table/VirtualizedPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <VirtualizedPage />
      </InjectorProviders>
    );
  });
});
