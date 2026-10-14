import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTranslation } from "~/hooks/useTranslation";
import { SwitchLanguage } from ".";

vi.mock("~/hooks/useTranslation");
vi.mock("../Icons", () => ({
  Icons: ({ nameIcon }: { nameIcon: string }) => (
    <span data-testid={`icon-${nameIcon}`} />
  ),
}));

describe("components/SwitchLanguage", () => {
  it("should render English icon and text when language is en-US and toggle to pt-BR on click", () => {
    const changeLanguage = vi.fn();
    vi.mocked(useTranslation).mockReturnValue({
      currentLanguage: "en-US",
      changeLanguage,
      translate: (key: string) => key,
    } as any);

    render(<SwitchLanguage expanded />);

    expect(screen.getByTestId("icon-eua")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(changeLanguage).toHaveBeenCalledWith("pt-BR");
  });

  it("should render Brazil icon and text when language is pt-BR and toggle to en-US on click", () => {
    const changeLanguage = vi.fn();
    vi.mocked(useTranslation).mockReturnValue({
      currentLanguage: "pt-BR",
      changeLanguage,
      translate: (key: string) => key,
    } as any);

    render(<SwitchLanguage expanded />);

    expect(screen.getByTestId("icon-brazil")).toBeInTheDocument();
    expect(screen.getByText("Português")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(changeLanguage).toHaveBeenCalledWith("en-US");
  });

  it("should not render text when expanded is false", () => {
    vi.mocked(useTranslation).mockReturnValue({
      currentLanguage: "en-US",
      changeLanguage: vi.fn(),
      translate: (key: string) => key,
    } as any);

    render(<SwitchLanguage expanded={false} />);

    expect(screen.queryByText("English")).toBeNull();
  });
});
