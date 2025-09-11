/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";

import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { FavoritesPage } from ".";

describe("Pages/Table/FavoritesPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <FavoritesPage />
      </InjectorProviders>
    );
  });
});
