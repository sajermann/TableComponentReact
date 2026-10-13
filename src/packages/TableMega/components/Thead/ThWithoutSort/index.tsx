import { Header, Table } from '@tanstack/react-table';
import { managerClassNames } from '~/packages/TableMega/utils/managerClassNames';
import { ResizingElement } from '../ResizingElement';
import { ThContent } from '../ThContent';

type TThWithoutSortProps<T = unknown> = {
  table: Table<T>;
  header: Header<T, unknown>;
};

export function ThWithoutSort<T = unknown>({
  header,
  table,
}: TThWithoutSortProps<T>) {
  const meta = header.getContext().column.columnDef.meta;
  return (
    <th
      className={managerClassNames([
        'p-4 relative ',
        {
          'text-left': !meta?.align,
          'text-center': meta?.align === 'center',
          'text-right': meta?.align === 'right',
        },
      ])}
      key={header.id}
      colSpan={header.colSpan}
      style={{
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder ? null : (
        <>
          <ThContent table={table} header={header} />
          <ResizingElement header={header} />
        </>
      )}
    </th>
  );
}
