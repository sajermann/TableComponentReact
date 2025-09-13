import { useEffect } from "react";
import { useBreadcrumbs } from "..";
import { TBreadcrumb } from "../useBreadcrumbs/types";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

type TUsePagesConfigProps = {
  breadcrumbs?: TBreadcrumb[];
  pageTitle?: string;
  otherComponents?: {
    prev: string | null;
    next: string | null;
  };
};

export function usePagesConfig({
  breadcrumbs,
  pageTitle,
  otherComponents,
}: TUsePagesConfigProps) {
  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs(breadcrumbs || []);
  }, [JSON.stringify(breadcrumbs)]);

  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${APPLICATION_NAME}`
      : APPLICATION_NAME;
  }, [pageTitle]);

  useEffect(() => {}, [otherComponents]);
}
