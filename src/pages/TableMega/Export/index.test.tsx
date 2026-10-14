/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { InjectorProviders } from "~/components";
import { TableMegaExportPage } from ".";

const samplePerson = {
  id: "1",
  name: "John",
  lastName: "Doe",
  birthday: "2000-01-01",
  email: "john@example.com",
  role: "User",
  isActive: true,
  friends: [{ name: "Friend A" }, { name: "Friend B" }],
};

function triggerDefFunctions(defColumns: any[]) {
  defColumns?.forEach((col: any) => {
    col.styleHeaderCellFn?.();
    const val = (samplePerson as any)[col.accessor] ?? samplePerson.birthday;
    col.accessorFn?.({ valueCell: val, row: samplePerson });
    col.styleCellFn?.({ row: { ...samplePerson, isActive: true } });
    col.styleCellFn?.({ row: { ...samplePerson, isActive: false } });
    col.cellRender?.({ valueCell: "rendered-content" });
  });
}

vi.mock("~/packages/TableMega/utils", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    exportTo: {
      print: vi.fn((params) => triggerDefFunctions(params.defColumns)),
      pdf: vi.fn((params) => triggerDefFunctions(params.defColumns)),
      png: vi.fn((params) => triggerDefFunctions(params.defColumns)),
      xls: vi.fn((params) => triggerDefFunctions(params.defColumns)),
      csv: vi.fn((params) => triggerDefFunctions(params.defColumns)),
      xml: vi.fn((params) => triggerDefFunctions(params.defColumns)),
    },
  };
});

describe("pages/TableMega/TableMegaExportPage", () => {
  it("should render and trigger all export actions", async () => {
    render(
      <InjectorProviders>
        <TableMegaExportPage />
      </InjectorProviders>
    );

    const printerBtn = screen.getByTestId("button-export-printer");
    const pdfBtn = screen.getByTestId("button-export-pdf");
    const pngBtn = screen.getByTestId("button-export-png");
    const xlsBtn = screen.getByTestId("button-export-xls");
    const csvBtn = screen.getByTestId("button-export-csv");
    const xmlBtn = screen.getByTestId("button-export-xml");

    expect(printerBtn).toBeInTheDocument();
    expect(pdfBtn).toBeInTheDocument();
    expect(pngBtn).toBeInTheDocument();
    expect(xlsBtn).toBeInTheDocument();
    expect(csvBtn).toBeInTheDocument();
    expect(xmlBtn).toBeInTheDocument();

    fireEvent.click(printerBtn);
    fireEvent.click(pdfBtn);
    fireEvent.click(pngBtn);
    fireEvent.click(xlsBtn);
    fireEvent.click(csvBtn);
    fireEvent.click(xmlBtn);
  });
});
