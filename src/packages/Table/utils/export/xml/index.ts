import { toXML } from 'jstoxml';
import { TDefXml } from '../../../types';
import { download } from '../download';

type TXmlProps<T> = {
  data: T[];
  defColumns?: TDefXml<T>[];
};

export function xml<T>({ data, defColumns = [] }: TXmlProps<T>) {
  const newData: Record<string, unknown>[] = [];

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

      rowTemp.push({
        [defCol.header.replaceAll(' ', '')]: value,
      });
    }
    newData.push({ item: rowTemp });
  }

  const tratedDate = {
    data: newData,
  };

  const result = toXML(tratedDate, {
    indent: '    ',
  });
  const BOM = new Uint8Array([0xef, 0xbb, 0xbf]); // For special characteres
  const blob = new Blob([BOM, result], { type: 'application/xml' });
  download(blob, `xml`);
}
