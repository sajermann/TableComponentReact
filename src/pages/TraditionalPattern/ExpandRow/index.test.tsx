/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components";
import { TraditionalExpandRowPage } from ".";

describe("pages//TraditionalPattern/TraditionalExpandRowPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <TraditionalExpandRowPage />
      </InjectorProviders>
    );
  });
});
