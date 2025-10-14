import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Version } from ".";

describe("components/Version", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("should render without crashing", () => {
    render(<Version />);
  });

  it("should call console.table with correct environment variables", () => {
    vi.stubEnv("VITE_MODE", "production");
    vi.stubEnv("VITE_DEPLOY_TIME", "2025-06-17T01:29:39.346Z");
    vi.stubEnv("VITE_COMMIT_HASH", "abcdef123456");
    vi.stubEnv("VITE_COMMIT_SHORT_HASH", "abcdef1");
    vi.stubEnv("VITE_COMMIT_MESSAGE", "fix: something important");
    vi.stubEnv("VITE_COMMIT_AUTHOR", "dev");
    vi.stubEnv("VITE_BRANCH_NAME", "main");
    vi.stubEnv("VITE_LAST_COMMIT_DATE", "2025-06-16");
    vi.stubEnv("VITE_TOTAL_COMMITS", "42");

    const spy = vi.spyOn(console, "table");
    render(<Version />);
    expect(spy).toHaveBeenCalledWith({
      MODE: "production",
      DEPLOY_TIME: "2025-06-17T01:29:39.346Z",
      COMMIT_HASH: "abcdef123456",
      COMMIT_SHORT_HASH: "abcdef1",
      COMMIT_MESSAGE: "fix: something important",
      COMMIT_AUTHOR: "dev",
      BRANCH_NAME: "main",
      LAST_COMMIT_DATE: "2025-06-16",
      TOTAL_COMMITS: "42",
    });
    spy.mockRestore();
  });

  it("should not render any DOM elements", () => {
    const { container } = render(<Version />);
    expect(container.firstChild).toBeNull();
  });
});
