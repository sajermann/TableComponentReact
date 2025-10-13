import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Layout } from ".";

// vi.mock("~/components");
vi.mock(import("~/components"), async (importOriginal) => {
  const mod = await importOriginal(); // type is inferred
  return {
    ...mod,
    Version: () => <div>Version Test</div>, // Não consigo mockar pelo vi.mocked quando função exportada como constant
    Config: () => <div>Config Test</div>,
  } as any;
});

describe("components/Layout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders render corretly", () => {
    const { getByText } = render(
      <Layout>
        <div>Layout Test</div>
      </Layout>
    );

    expect(getByText("Config Test")).toBeInTheDocument();
    expect(getByText("Version Test")).toBeInTheDocument();
    expect(getByText("Layout Test")).toBeInTheDocument();
  });
});
