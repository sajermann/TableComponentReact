/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { SortPage } from ".";

describe("Pages/Table/SortPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <SortPage />
      </InjectorProviders>
    );
  });
});
