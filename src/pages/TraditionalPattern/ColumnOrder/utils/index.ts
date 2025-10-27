type TColumnOrderProp = {
  id: string;
  content: string;
};
type THandleChangeOrderProps = {
  currentId: string;
  targetId?: string;
  columnOrder: TColumnOrderProp[];
  setColumnOrder: (data: TColumnOrderProp[]) => void;
};

export function handleChangeOrder({
  currentId,
  targetId,
  columnOrder,
  setColumnOrder,
}: THandleChangeOrderProps) {
  const currentIndex = columnOrder.findIndex(item => item.id === currentId);
  const targetIndex = columnOrder.findIndex(item => item.id === targetId);
  if (currentIndex < 0 || targetIndex < 0) {
    return;
  }

  const newOrder = [...columnOrder];
  [newOrder[currentIndex], newOrder[targetIndex]] = [
    newOrder[targetIndex],
    newOrder[currentIndex],
  ];

  setColumnOrder(newOrder.map(item => ({ ...item })));
}
