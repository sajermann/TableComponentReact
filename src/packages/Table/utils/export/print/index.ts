import { TDefPrintPdfPng } from '../../../types';
import { buildTable } from '../buildTable';

type TPrintProps<T> = {
  data: T[];
  defColumns?: TDefPrintPdfPng<T>[];
};

export function print<T>({ data, defColumns = [] }: TPrintProps<T>) {
  const table = buildTable({ data, defColumns });

  const windowForPrint = window.open('');
  if (windowForPrint) {
    windowForPrint.document.body.append(table);
    setTimeout(() => {
      windowForPrint.print();
    }, 500);

    windowForPrint.onfocus = () => {
      setTimeout(() => {
        windowForPrint.close();
      }, 500);
    };
  }
}
