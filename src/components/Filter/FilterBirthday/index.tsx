import { Column } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ContainerInput, Datepicker, Label } from "~/components";
import { useTranslation } from "~/hooks";
import { TPerson } from "~/types";
import { PopoverBase } from "../PopoverBase";

export function FilterBirthday({
  column,
}: {
  column: Column<TPerson, unknown>;
}) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });

  const funnelFilled = useMemo(() => {
    return !(dates.from === "" && dates.to === "");
  }, [dates]);

  return (
    <PopoverBase
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClear={() => {
        setDates({ from: "", to: "" });
        column.setFilterValue(undefined);
      }}
      onSave={() => column.setFilterValue(dates)}
      funnelFilled={funnelFilled}
    >
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
    </PopoverBase>
  );
}
