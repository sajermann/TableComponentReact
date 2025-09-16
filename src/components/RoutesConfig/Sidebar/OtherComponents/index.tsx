import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useOtherComponents } from "~/hooks/useOtherComponents";
// import { Link } from "react-router";

import { useRoutesMenu } from "~/hooks/useRoutesMenu";
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
      <div className="flex justify-between items-center">
        <div>
          {otherComponents.prev && (
            <Link
              className="flex items-center justify-center hover:text-primary-700 transition-colors duration-500"
              to={otherComponents.prev.path}
            >
              <ArrowLeftIcon width="2rem" />
              <span>{otherComponents.prev.label}</span>
            </Link>
          )}
        </div>
        <div>
          {otherComponents.next && (
            <Link
              className="flex items-center justify-center hover:text-primary-700 transition-colors duration-500"
              to={otherComponents.next.path}
            >
              {otherComponents.next.label}
              <ArrowRightIcon width="2rem" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
