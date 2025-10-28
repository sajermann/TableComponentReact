import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExportButtons } from ".";

import { exportTo } from "../../utils";

// Mocks
const mockPrint = vi.fn();
const mockPdf = vi.fn();
const mockPng = vi.fn();
const mockXls = vi.fn();
const mockCsv = vi.fn();
const mockXml = vi.fn();

vi.mock("../../utils");

vi.mock("../Icons", () => ({
  Icons: (props: any) => <span data-testid={props.nameIcon} />,
}));

vi.mock("~/hooks/useTranslation", () => ({
  useTranslation: () => ({
    translate: (key: string) => key,
  }),
}));

vi.mock("../Button", () => ({
  Button: (props: any) => (
    <button
      data-testid={props.startIcon && props.title ? props.title : "button"}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  ),
}));

function createMockTable() {
  return {
    getRowModel: () => ({
      rows: [
        { original: { id: 1, value: "A" } },
        { original: { id: 2, value: "B" } },
      ],
    }),
  };
}

const mockTools = {
  defForPrint: [{ id: "printCol" }],
  defForPdf: [{ id: "pdfCol" }],
  defForPng: [{ id: "pngCol" }],
  defForExcel: [{ id: "xlsCol" }],
  defForCsv: [{ id: "csvCol" }],
  defForXml: [{ id: "xmlCol" }],
};

describe("packages/Table/components/ExportButtons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render nothing if tools is not provided", () => {
    const { container } = render(
      <ExportButtons table={createMockTable()} containerProps={{}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should display a button for each export type if present in tools", () => {
    render(
      <ExportButtons
        table={createMockTable()}
        containerProps={{}}
        tools={mockTools}
      />
    );
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_PRINTER" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_PDF" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_PNG" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_XLS" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_CSV" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "EXPORT_TO_XML" })
    ).toBeInTheDocument();
  });

  it("should call the correct export function when export buttons are clicked", () => {
    vi.mocked(exportTo.pdf).mockImplementation(mockPdf);
    vi.mocked(exportTo.print).mockImplementation(mockPrint);
    vi.mocked(exportTo.png).mockImplementation(mockPng);
    vi.mocked(exportTo.xls).mockImplementation(mockXls);
    vi.mocked(exportTo.csv).mockImplementation(mockCsv);
    vi.mocked(exportTo.xml).mockImplementation(mockXml);

    render(
      <ExportButtons
        table={createMockTable()}
        containerProps={{}}
        tools={mockTools}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_PRINTER" }));
    expect(mockPrint).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_PDF" }));
    expect(mockPdf).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_PNG" }));
    expect(mockPng).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_XLS" }));
    expect(mockXls).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_CSV" }));
    expect(mockCsv).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "EXPORT_TO_XML" }));
    expect(mockXml).toHaveBeenCalledTimes(1);
  });
});
