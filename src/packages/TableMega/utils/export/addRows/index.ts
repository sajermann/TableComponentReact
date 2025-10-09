import { TDefPrintPdfPng } from '~/packages/Table/types';

type TAddRowsProps<T> = {
  data: T[];
  defColumns: TDefPrintPdfPng<T>[];
};

export function addRows<T>({ data, defColumns }: TAddRowsProps<T>) {
  const dataTemp: Record<string, unknown>[][] = [];
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
      rowTemp.push({
        value,
        align: defCol.align,
        cellRender: defCol.cellRender,
      });
    }
    dataTemp.push(rowTemp);
  }
  return dataTemp;
}
