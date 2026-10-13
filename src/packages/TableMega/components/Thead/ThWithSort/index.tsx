import { Header, Table } from '@tanstack/react-table';
import { managerClassNames } from '~/packages/TableMega/utils/managerClassNames';
import { ResizingElement } from '../ResizingElement';
import { ThContent } from '../ThContent';
import { ThWithoutSort } from '../ThWithoutSort';

type TThWithSortProps<T = unknown> = {
  table: Table<T>;
  header: Header<T, unknown>;
};

export function ThWithSort<T = unknown>({
  header,
  table,
}: TThWithSortProps<T>) {
  if (!header.column.getCanSort?.()) {
    return <ThWithoutSort table={table} header={header} />;
  }
  const meta = header.getContext().column.columnDef.meta;
  return (
    <th
      className={managerClassNames([
        'p-4 relative',
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
          <ThContent table={table} header={header} withSorting />
          <ResizingElement header={header} />
        </>
      )}
    </th>
  );
}
