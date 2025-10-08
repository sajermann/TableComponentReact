import XLSX from 'xlsx-js-style';
import { TDefCsv } from '../../../types';
import { download } from '../download';

type TCsvProps<T> = {
  data: T[];
  defColumns?: TDefCsv<T>[];
  delimiter?: string;
};

export function csv<T>({
  data,
  defColumns = [],
  delimiter = ';',
}: TCsvProps<T>) {
  const resultFinal: Record<string, unknown>[] = [];
  for (let i = 0; i < data.length; i += 1) {
    let result: Record<string, unknown> = {};
    for (const item of defColumns) {
      const valueTemp = item.accessorFn
        ? item.accessorFn({
            original: data,
            row: data[i],
            valueCell: data[i][item.accessor],
            index: i,
          })
        : data[i][item.accessor];
      const tempHeader = {
        [item.header]: valueTemp,
      };
      result = {
        ...result,
        ...tempHeader,
      };
    }
    resultFinal.push(result);
  }

  const ws = XLSX.utils.json_to_sheet(resultFinal);
  const csvOutput: string = XLSX.utils.sheet_to_csv(ws, { FS: delimiter });

  const BOM = new Uint8Array([0xef, 0xbb, 0xbf]); // For special characteres
  const blob = new Blob([BOM, csvOutput], { type: 'application/csv' });
  download(blob, `csv`);
}
