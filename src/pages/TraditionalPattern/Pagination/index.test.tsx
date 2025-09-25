/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { PaginationPage } from ".";

describe("pages/TraditionalPattern/PaginationPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <PaginationPage />
      </InjectorProviders>
    );
  });
});
