export function verifyIndeterminate(table: {
  getIsAllRowsSelected: () => boolean;
  getIsSomeRowsSelected: () => boolean;
}) {
  if (table.getIsAllRowsSelected()) {
    return true;
  }

  if (table.getIsSomeRowsSelected()) {
    return 'indeterminate';
  }

  return false;
}
