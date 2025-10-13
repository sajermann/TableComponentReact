import * as reactRouter from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  useDebouncedCallback,
  useLoadingLazy,
  useTranslation,
  useWindow,
} from "~/hooks";
import { useBreadcrumbs } from "~/hooks/useBreadcrumbs";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TMenu } from "./types";
import { buildOptions, scrollToSection } from "./utils";

import { TableOfContents } from ".";

vi.mock("@tanstack/react-router");

describe("components/RoutesConfig/Sidebar/TableOfContents", () => {
  it("render correctly", () => {
    vi.mocked(useLocation).mockImplementation(
      () => ({ location: "test" }) as any
    );
    render(<TableOfContents />);
  });
});
