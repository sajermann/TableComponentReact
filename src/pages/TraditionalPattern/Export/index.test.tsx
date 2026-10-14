/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { InjectorProviders } from "~/components";
import { ExportPage } from ".";

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

vi.mock("~/packages/Table/utils", async (importOriginal) => {
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

describe("Pages/Export", () => {
  it("should render and trigger all export actions", async () => {
    render(
      <InjectorProviders>
        <ExportPage />
      </InjectorProviders>
    );

    const printerBtn = screen.getByTitle(/export to printer/i);
    const pdfBtn = screen.getByTitle(/export to pdf/i);
    const pngBtn = screen.getByTitle(/export to png/i);
    const xlsBtn = screen.getByTitle(/export to xls/i);
    const csvBtn = screen.getByTitle(/export to csv/i);
    const xmlBtn = screen.getByTitle(/export to xml/i);

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
