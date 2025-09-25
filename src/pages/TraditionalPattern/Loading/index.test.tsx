/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";

import { LoadingPage } from ".";

describe("pages/TraditionalPattern/LoadingPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <LoadingPage />
      </InjectorProviders>
    );
  });
});
