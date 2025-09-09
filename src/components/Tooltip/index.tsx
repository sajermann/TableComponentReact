import * as React from "react";
import * as TooltipRadix from "@radix-ui/react-tooltip";

export function Tooltip({
  children,
  content,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  content: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root open={open} onOpenChange={onOpenChange}>
        <TooltipRadix.Trigger asChild>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className="select-none rounded px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            {content}
            <TooltipRadix.Arrow className="fill-white" />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
}
