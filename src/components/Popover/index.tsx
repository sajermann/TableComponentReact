import * as PopoverRadix from "@radix-ui/react-popover";
import { managerClassNames } from "~/utils";
import { CloseButton } from "./components/CloseButton";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  closeButton?: boolean;
  onClose?: () => void;
  onInteractOutside?: () => void;
  trigger?: React.ReactNode;
};

export function Popover({
  children,
  isOpen,
  onClose,
  trigger,
  closeButton,
  onInteractOutside,
}: Props) {
  return (
    <div className="relative inline-block text-left">
      <PopoverRadix.Root open={isOpen}>
        <PopoverRadix.Trigger asChild>{trigger}</PopoverRadix.Trigger>
        <PopoverRadix.Portal>
          <PopoverRadix.Content
            onInteractOutside={onInteractOutside}
            align="center"
            sideOffset={4}
            className={managerClassNames([
              "data-[state=open]:animate-enter",
              "data-[state=closed]:animate-leave",
              "shadow-lg shadow-black/25 dark:shadow-white/25",
              "bg-transparent backdrop-blur-md border",
              "rounded-lg z-[1] p-4",
            ])}
          >
            {children}
            <CloseButton onClose={onClose} show={!!closeButton} />
            <PopoverRadix.Arrow className="fill-black dark:fill-white" />
          </PopoverRadix.Content>
        </PopoverRadix.Portal>
      </PopoverRadix.Root>
    </div>
  );
}
