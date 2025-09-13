import Select from "~/components/Select";
import { useTranslation } from "~/hooks";
import { managerClassNames } from "~/utils";

type TItem = {
  id: string;
  content: string;
};

export function ColumnOrderSelector({
  items,
  onChange,
}: {
  items: TItem[];
  onChange: (data: TItem[]) => void;
}) {
  function handleChangeOrder({
    currentIndex,
    oldIndex,
  }: {
    currentIndex: number;
    oldIndex: number;
  }) {
    const newItems = items.map((it, i) => {
      if (i === currentIndex) {
        return items[oldIndex];
      }
      if (i === oldIndex) {
        return items[currentIndex];
      }
      return it;
    });
    onChange(newItems);
  }

  return (
    <div className="flex flex-col gap-2 rounded-2xl p-2">
      <div className="flex gap-2 items-center">
        {items.map((item, index) => (
          <Select.Container key={item.id}>
            <Select.Select
              onChange={({ target }) => {
                handleChangeOrder({
                  currentIndex: index,
                  oldIndex: items.findIndex((i) => i.content === target.value),
                });
              }}
              defaultValue={item.content}
              value={item.content}
            >
              {items.map((opt) => (
                <Select.Option key={opt.id} value={opt.content}>
                  {opt.content}
                </Select.Option>
              ))}
            </Select.Select>
            <Select.Arrow />
          </Select.Container>
        ))}
      </div>
    </div>
  );
}
