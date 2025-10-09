import { jsPDF as JsPdf } from 'jspdf';
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { TDefPrintPdfPng } from '../../../types';
import { buildTable } from '../buildTable';

type TPrintProps<T> = {
  data: T[];
  defColumns?: TDefPrintPdfPng<T>[];
};

export function pdf<T>({ data, defColumns = [] }: TPrintProps<T>) {
  // TODO: Fix friends column
  const table = buildTable({ data, defColumns });
  applyPlugin(JsPdf);
  const doc = new JsPdf({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  autoTable(doc, { html: table });
  doc.save(`Data-${new Date().toISOString()}.pdf`);
}
