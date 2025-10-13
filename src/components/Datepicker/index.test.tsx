import { beforeEach } from "node:test";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Datepicker } from ".";
import { Input } from "../Input";

vi.mock("../Input");

describe("components/Datepicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders render corretly", () => {
    vi.mocked(Input).mockImplementation((props) => (
      <input {...props} type="date" />
    ));
    const { getByTestId } = render(
      <Datepicker data-testid="test-datepicker" />
    );
    expect(getByTestId("test-datepicker")).toBeInTheDocument();
  });
});
