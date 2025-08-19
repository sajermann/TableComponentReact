/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";
import * as useLoadingLazyMock from "~/hooks/useLoadingLazy";
import { TableOfContents } from ".";

describe("Components/Sidebar/TableOfContents", () => {
  it(`should render table of content`, async () => {
    vi.spyOn(useLoadingLazyMock, "useLoadingLazy").mockImplementation(() => ({
      isLoadingLazy: false,
    }));
    vi.spyOn(document, "querySelectorAll").mockImplementation(
      () =>
        [
          {
            nodeName: "test0",
            textContent: "test0",
            getBoundingClientRect: () => ({ top: 100 }),
            setAttribute: vi.fn(),
          },
          {
            nodeName: "test1",
            textContent: "test1",
            getBoundingClientRect: () => ({ top: 10 }),
            setAttribute: vi.fn(),
          },
        ] as any
    );
    const { getByText } = render(
      <InjectorProviders>
        <TableOfContents />
      </InjectorProviders>
    );
    expect(getByText("test0")).toBeTruthy();
  });
});
