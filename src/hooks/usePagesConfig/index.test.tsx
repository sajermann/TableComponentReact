import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as Router from "@tanstack/react-router";
import { usePagesConfig } from ".";

vi.mock("@tanstack/react-router");
vi.mock("..", () => ({
  useTranslation: () => ({ translate: mockTranslate, currentLanguage: "en" }),
  useBreadcrumbs: () => ({ setBreadcrumbs: mockSetBreadcrumbs }),
}));
vi.mock("../useOtherComponents", () => ({
  useOtherComponents: () => ({ setOtherComponents: mockSetOtherComponents }),
}));
vi.mock("./utils/buildBreadcrumbs", () => ({
  buildBreadcrumbs: (...args: any) => buildBreadcrumbs(...args),
}));
vi.mock("./utils/buildOtherComponents", () => ({
  buildOtherComponents: (...args: any) => buildOtherComponents(...args),
}));

const mockSetBreadcrumbs = vi.fn();
const mockSetOtherComponents = vi.fn();
const mockTranslate = vi.fn();

const buildBreadcrumbs = vi.fn();
const buildOtherComponents = vi.fn();

const useMatchesMock = vi.mocked(Router.useMatches);
const useRouterMock = vi.mocked(Router.useRouter);
const useLocationMock = vi.mocked(Router.useLocation);

describe("hooks/usePagesConfig", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useMatchesMock.mockReturnValue([
      { staticData: { routerName: "Home" }, pathname: "/" },
    ] as any);
    useRouterMock.mockReturnValue({
      routesById: [{ _fullPath: "/", rank: 1 }],
    } as any);
    useLocationMock.mockReturnValue({
      pathname: "/",
    } as any);

    mockTranslate.mockImplementation((label) => label);
  });

  it("should call buildBreadcrumbs and buildOtherComponents with correct arguments", () => {
    renderHook(() => usePagesConfig());

    expect(buildBreadcrumbs).toHaveBeenCalledWith({
      matchs: [{ staticData: { routerName: "Home" }, pathname: "/" }],
      setBreadcrumbs: mockSetBreadcrumbs,
      translate: mockTranslate,
    });

    expect(buildOtherComponents).toHaveBeenCalledWith({
      pathname: "/",
      routes: [{ _fullPath: "/", rank: 1 }],
      setOtherComponents: mockSetOtherComponents,
    });
  });

  it("should call effects again when currentLanguage changes", () => {
    const { rerender } = renderHook(() => usePagesConfig());

    useMatchesMock.mockReturnValue([
      { staticData: { routerName: "Home" }, pathname: "/" },
      { staticData: { routerName: "About" }, pathname: "/about" },
    ] as any);

    mockTranslate.mockImplementation((label) => `translated-${label}`);

    rerender();

    expect(buildBreadcrumbs).toHaveBeenCalledTimes(2);
    expect(buildOtherComponents).toHaveBeenCalledTimes(2);
  });
});
