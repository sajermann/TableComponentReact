import { Column } from "@tanstack/react-table";
import { FunnelIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button, ContainerInput, Datepicker, Label } from "~/components";
import { Popover } from "~/components/Popover";
import { useTranslation } from "~/hooks";
import { TPerson } from "~/types";

export function FilterBirthday({
  column,
}: {
  column: Column<TPerson, string>;
}) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });

  function verifyFillFilter() {
    if (dates.from === "" && dates.to === "") return false;
    return true;
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInteractOutside={() => setIsOpen(false)}
      trigger={
        <button
          className="w-5 h-4 flex items-center justify-center"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FunnelIcon className={verifyFillFilter() ? "fill-white" : ""} />
        </button>
      }
    >
      <>
        <div className="flex flex-col gap-4">
          <div className="w-48">
            <ContainerInput>
              <Label htmlFor="from">{translate("FROM")}</Label>
              <Datepicker
                placeholder="DD/MM/YYYY"
                id="from"
                value={dates.from}
                onChange={(e) =>
                  setDates((prev) => ({ ...prev, from: e.target.value }))
                }
              />
            </ContainerInput>
          </div>
          <div className="w-48">
            <ContainerInput>
              <Label htmlFor="to">{translate("TO")}</Label>
              <Datepicker
                placeholder="DD/MM/YYYY"
                id="to"
                value={dates.to}
                onChange={(e) =>
                  setDates((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </ContainerInput>
          </div>
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <Button
            iconButton="rounded"
            colorStyle="mono"
            variant="outlined"
            onClick={() => setDates({ from: "", to: "" })}
            endIcon={<TrashIcon />}
          />

          <Button
            iconButton="rounded"
            variant="outlined"
            colorStyle="mono"
            onClick={() => {
              column.setFilterValue(dates);
              setIsOpen(false);
            }}
            endIcon={<SaveIcon />}
          />
        </div>
      </>
    </Popover>
  );
}
