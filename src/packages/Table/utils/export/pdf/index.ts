import { jsPDF as JsPdf } from 'jspdf';
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { TDefPrintPdfPng } from '../../../types';
import { buildTable } from '../buildTable';

type TPrintProps<T> = {
  data: T[];
  defColumns?: TDefPrintPdfPng<T>[];
};

export function pdf<T>({ data, defColumns = [] }: TPrintProps<T>) {
  const table = buildTable({ data, defColumns });
  applyPlugin(JsPdf);
  const doc = new JsPdf({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  autoTable(doc, {
    html: table,
    didParseCell: (hookData) => {
      if (hookData.cell.text) {
        hookData.cell.text = hookData.cell.text.map((text) =>
          text.replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()
        );
      }
    },
  });
  doc.save(`Data-${new Date().toISOString()}.pdf`);
}
