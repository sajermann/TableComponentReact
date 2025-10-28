import * as PopoverRadix from "@radix-ui/react-popover";

import { XIcon } from "lucide-react";
import { managerClassNames } from "~/utils";
import { Icons } from "../Icons";
import { Show } from "../Show";

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
            <Show condition={!!closeButton}>
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
            </Show>

            <PopoverRadix.Arrow className="fill-black dark:fill-white" />
          </PopoverRadix.Content>
        </PopoverRadix.Portal>
      </PopoverRadix.Root>
    </div>
  );
}
