/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InjectorProviders } from "~/components";
import { ColumnVisibilityPage } from "./";

describe("pages/TraditionalPattern/ColumnVisibilityPage", () => {
  it("must render and handle toggling column visibility", () => {
    render(
      <InjectorProviders>
        <ColumnVisibilityPage />
      </InjectorProviders>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);

    // Toggle a checkbox to trigger handleCheck branch
    fireEvent.click(checkboxes[0]);
    // Toggle again
    fireEvent.click(checkboxes[0]);
  });
});
