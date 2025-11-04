/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { ResizingPage } from ".";

describe("pages/TraditionalPattern/ResizingPage", () => {
  it(`must render `, async () => {
    render(
      <InjectorProviders>
        <ResizingPage />
      </InjectorProviders>
    );
  });
});
