/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { FilterPage } from ".";

describe("Pages/Table/FilterPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <FilterPage />
      </InjectorProviders>
    );
  });
});
