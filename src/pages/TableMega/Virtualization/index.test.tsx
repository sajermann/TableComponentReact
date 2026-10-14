/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InjectorProviders } from "~/components";
import { TableMegaVirtualizationPage } from "./";

vi.mock("~/utils", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    makeData: {
      ...((actual.makeData as Record<string, unknown>) || {}),
      person: () => [
        {
          id: "1",
          avatar: "avatar1.png",
          name: "John",
          lastName: "Doe",
          email: "john@example.com",
          birthday: "2000-01-01",
          role: "Dev",
          isActive: true,
        },
        {
          id: "2",
          avatar: "avatar2.png",
          name: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          birthday: "1995-05-15",
          role: "Admin",
          isActive: false,
        },
      ],
    },
  };
});

describe("pages/TableMega/TableMegaVirtualizationPage", () => {
  it("must render and toggle virtualization between virtualized and regular rows", () => {
    render(
      <InjectorProviders>
        <TableMegaVirtualizationPage />
      </InjectorProviders>
    );

    const buttons = screen.getAllByRole("button");
    const toggleButton = buttons[0];
    expect(toggleButton).toBeInTheDocument();

    // Toggle virtualization to switch to non-virtualized rows
    fireEvent.click(toggleButton);
    // Toggle back to virtualized rows
    fireEvent.click(toggleButton);
  });
});
