import * as PopoverRadix from "@radix-ui/react-popover";
import { XIcon } from "lucide-react";
import { managerClassNames } from "~/utils";

type TCloseProps = {
  onClose?: () => void;
  show?: boolean;
};
export function CloseButton({ show, onClose }: TCloseProps) {
  if (!show) return null;
  return (
    <PopoverRadix.Close
      onClick={onClose}
      className={managerClassNames([
        "w-7 h-7 absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        "hover:opacity-50 transition-all duration-500",
      ])}
      aria-label="Close"
    >
      <XIcon className="w-full h-full" />
    </PopoverRadix.Close>
  );
}
