/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { EllipsisPage } from ".";

describe("pages/TraditionalPattern/EllipsisPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <EllipsisPage />
      </InjectorProviders>
    );
  });
});
