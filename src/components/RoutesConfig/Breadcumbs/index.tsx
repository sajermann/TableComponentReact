import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "~/hooks";
import { useBreadcrumbs } from "~/hooks/useBreadcrumbs";

export function Breadcrumbs() {
  const { translate } = useTranslation();
  const { breadcrumbs } = useBreadcrumbs();
  const location = useLocation();

  if (!breadcrumbs || !breadcrumbs.length || location.pathname === "/") {
    return null;
  }

  return (
    <div className="flex gap-1 !text-primary-500">
      {breadcrumbs.map((item, index) =>
        item.link && breadcrumbs[index + 1] ? (
          <ol key={`${item.link}-${breadcrumbs[index + 1]}`}>
            <Link to={item.link} className="hover:underline !text-primary-500">
              {translate(item.label)}
            </Link>
            {breadcrumbs[index + 1].label && " / "}
          </ol>
        ) : (
          <ol key={`${item.label}-${index}`}>{translate(item.label)}</ol>
        )
      )}
    </div>
  );
}
