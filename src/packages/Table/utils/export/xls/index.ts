import XLSX from 'xlsx-js-style';
import { TDefXlsx } from '../../../types';
import { download } from '../download';

const XLS_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

type TXlsxProps<T> = {
  data: T[];
  defColumns?: TDefXlsx<T>[];
};

export function xls<T>({ data, defColumns = [] }: TXlsxProps<T>) {
  const headerTemp: Record<string, unknown>[] = [];
  const dataTemp: Record<string, unknown>[][] = [];

  // Add Header
  for (let i = 0; i < defColumns.length; i += 1) {
    const styleFn = defColumns[i].styleHeaderCellFn;
    headerTemp.push({
      v: defColumns[i].header,
      s: styleFn?.({
        valueHeader: defColumns[i].header,
        currentDefinition: defColumns[i],
        definitions: defColumns,
        index: i,
      }),
    });
  }

  // Add Rows
  for (let i = 0; i < data.length; i += 1) {
    const rowTemp: Record<string, unknown>[] = [];
    for (const defCol of defColumns) {
      const value = defCol.accessorFn
        ? defCol.accessorFn({
            valueCell: data[i][defCol.accessor],
            row: data[i],
            original: data,
            index: i,
          })
        : data[i][defCol.accessor];

      const style = defCol.styleCellFn
        ? defCol.styleCellFn({
            valueCell: value,
            row: data[i],
            original: data,
            index: i,
          })
        : {};

      rowTemp.push({ v: value, t: defCol.typeCell, s: style });
    }
    dataTemp.push(rowTemp);
  }

  const ws = XLSX.utils.aoa_to_sheet([
    [...headerTemp],
    ...dataTemp.map(item => item),
  ]);

  const wb = {
    Sheets: {
      data: ws,
    },
    SheetNames: ['data'],
  };

  const eb = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([eb], { type: XLS_TYPE });
  download(blob, `xlsx`);
}
