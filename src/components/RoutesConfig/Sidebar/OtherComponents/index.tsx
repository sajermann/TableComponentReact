import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useOtherComponents } from "~/hooks";
import { useTranslation } from "~/hooks/useTranslation";

export function OtherComponents() {
  const { translate } = useTranslation();
  const { otherComponents } = useOtherComponents();

  if (otherComponents.next === null && otherComponents.prev === null) {
    return null;
  }

  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>{translate("OTHERS_COMPONENTS")}</p>
      <div className="flex gap-2 justify-between items-center">
        {otherComponents.prev && (
          <Link
            className="flex items-center justify-center gap-2 transition-all duration-300 flex-1 hover:opacity-70"
            to={otherComponents.prev.path}
            viewTransition
          >
            <ArrowLeftIcon className="w-5" />
            <span className="truncate flex-1 text-left">
              {translate(otherComponents.prev.label)}
            </span>
          </Link>
        )}

        {otherComponents.next && (
          <Link
            className="flex items-center justify-center gap-2 transition-all duration-300 flex-1 hover:opacity-70"
            to={otherComponents.next.path}
            viewTransition
          >
            <span className="truncate flex-1 text-right">
              {translate(otherComponents.next.label)}
            </span>

            <ArrowRightIcon className="w-5" />
          </Link>
        )}
      </div>
    </main>
  );
}
