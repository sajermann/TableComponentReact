import html2canvas from 'html2canvas-pro';
import { TDefPrintPdfPng } from '../../../types';
import { buildTable } from '../buildTable';
import { download } from '../download';

type TPrintProps<T> = {
  data: T[];
  defColumns?: TDefPrintPdfPng<T>[];
};

export function png<T>({ data, defColumns = [] }: TPrintProps<T>) {
  const table = buildTable({ data, defColumns });
  table.id = 'tempTable';
  document.body.appendChild(table);
  console.log({ table, d: document.body });

  html2canvas(table).then(canvas => {
    const blob = canvas.toDataURL('image/png', 1.0);
    download(blob, `png`);
    console.log(`vai cair aqui`);
    document.querySelector('#tempTable')?.remove();
  });
}
