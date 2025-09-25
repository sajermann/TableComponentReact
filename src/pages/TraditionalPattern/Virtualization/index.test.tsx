/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";

import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { VirtualizationPage } from ".";

describe("pages/TraditionalPattern/VirtualizedPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <VirtualizationPage />
      </InjectorProviders>
    );
  });
});
