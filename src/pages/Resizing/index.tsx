import { useEffect, useState } from "react";
import { Button, Section } from "~/components";
import { useColumns, useTranslation } from "~/hooks";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { makeData } from "~/utils";

type TResizingProps = {
  columnSizing: {
    [index: string]: number;
  };
};

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:resizing`;

const DEFAULT = {
  id: 100,
  avatar: 60,
  name: 100,
  lastName: 100,
  birthday: 100,
  email: 100,
  role: 100,
  isActive: 100,
  friends: 100,
};

export function ResizingPage() {
  const { translate } = useTranslation();
  const [data, setData] = useState<TPerson[]>([]);
  const [columnSize] = useState<Record<string, number>>(() => {
    const saveds = localStorage.getItem(IDENTIFIER);

    if (!saveds) {
      return DEFAULT;
    }

    return JSON.parse(saveds);
  });

  const { columns } = useColumns(columnSize);

  function onResizing(dataSizing: TResizingProps) {
    const keys = Object.keys(dataSizing.columnSizing);
    if (keys.length === 0) return;

    const saveds = localStorage.getItem(IDENTIFIER);

    const newDefault = saveds ? JSON.parse(saveds) : { ...DEFAULT };

    for (const item of keys) {
      newDefault[item] = dataSizing.columnSizing[item];
    }
    localStorage.setItem(IDENTIFIER, JSON.stringify(newDefault));
  }

  function handleReset() {
    localStorage.removeItem(IDENTIFIER);
    window.location.reload();
  }

  useEffect(() => {
    setData(makeData.person(5));
  }, []);

  return (
    <Section title={translate("RESIZING")} variant="h1">
      {translate("IMPLEMENTS_RESIZING_MODE")}
      <div className="flex flex-col gap-2">
        {translate("SAVE_COLUMN_SIZE_STATE_AFTER_ONE_SECOND_IN_LOCAL_STORAGE")}
        <div>
          <Button variant="outlined" colorStyle="mono" onClick={handleReset}>
            {translate("RESET")}
          </Button>
        </div>
        <Table columns={columns} data={data} onResizing={onResizing} />
      </div>
    </Section>
  );
}
