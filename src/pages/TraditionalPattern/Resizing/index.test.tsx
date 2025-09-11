/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components";
import { ResizingPage } from ".";

describe("Pages/Table/ResizingPage", () => {
  it(`must render `, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <ResizingPage />
      </InjectorProviders>
    );
  });
});
