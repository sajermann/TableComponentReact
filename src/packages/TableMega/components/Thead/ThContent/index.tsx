import { flexRender, Header, Table } from '@tanstack/react-table';
import { managerClassNames } from '../../../utils/managerClassNames';
import { SortIcon } from '../SortIcon';

export function ThContent<T = unknown>({
  header,
  withSorting,
  table,
}: {
  header: Header<T, unknown>;
  table: Table<T>;
  withSorting?: boolean;
}) {
  const columnMeta = header.getContext().column.columnDef.meta;
  const hasFilterElement = !!columnMeta?.filterElement;
  const canSort = header.column.getCanSort?.();

  if ((!canSort || !withSorting) && !hasFilterElement) {
    return flexRender(header.column.columnDef.header, header.getContext());
  }

  return (
    <div
      className={managerClassNames([
        'flex items-center gap-2',
        {
          'justify-center': columnMeta?.align === 'center',
          'justify-end': columnMeta?.align === 'right',
        },
      ])}
    >
      {!withSorting ? (
        flexRender(header.column.columnDef.header, header.getContext())
      ) : (
        <button
          type="button"
          className={managerClassNames([
            'flex items-center gap-2',
            'hover:opacity-70 transition-opacity duration-500',
            {
              'justify-center': columnMeta?.align === 'center',
              'justify-end': columnMeta?.align === 'right',
            },
          ])}
          tabIndex={canSort ? undefined : -1}
          onClick={header.column.getToggleSortingHandler?.()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          <SortIcon header={header} />
        </button>
      )}

      {columnMeta?.filterElement?.({
        column: header.getContext().column,
        table,
      })}
    </div>
  );
}
