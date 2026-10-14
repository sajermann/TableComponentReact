import { Row } from '@tanstack/react-table';
import { TSelection } from '../../types';

type Props<T extends Record<string, unknown>> = {
  selection?: Omit<TSelection<T>, 'disableCheckbox'>;
  row?: Row<T>;
};
export function onClickRow<T extends Record<string, unknown>>({
  selection,
  row,
}: Props<T>) {
  if (!selection || !row) {
    return;
  }
  if (selection?.disableSelectionRow) {
    const result = selection.disableSelectionRow(row);
    if (!result) {
      row.toggleSelected();
    }
  } else {
    row.toggleSelected();
  }
}
