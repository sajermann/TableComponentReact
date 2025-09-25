import { FunnelIcon, SaveIcon, TrashIcon } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "~/components";
import { Popover } from "~/components/Popover";
import { managerClassNames } from "~/utils";

type TPopoverBaseProps = {
  onSave: () => void;
  onClear: () => void;
  children: ReactNode;
  funnelFilled: boolean;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
};

export function PopoverBase({
  funnelFilled,
  children,
  onSave,
  onClear,
  isOpen,
  setIsOpen,
}: TPopoverBaseProps) {
  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onInteractOutside={() => setIsOpen(false)}
      trigger={
        <button
          className="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity duration-500"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FunnelIcon
            className={managerClassNames([
              "h-4.5  w-4.5",
              { "fill-white": funnelFilled },
            ])}
          />
        </button>
      }
    >
      {children}
      <div className="w-full flex justify-center gap-4 mt-4">
        <Button
          iconButton="rounded"
          colorStyle="mono"
          variant="outlined"
          onClick={() => {
            onClear();
            setIsOpen(false);
          }}
          endIcon={<TrashIcon />}
        />

        <Button
          iconButton="rounded"
          variant="outlined"
          colorStyle="mono"
          onClick={() => {
            onSave();
            setIsOpen(false);
          }}
          endIcon={<SaveIcon />}
        />
      </div>
    </Popover>
  );
}
