import { EyeIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBreadcrumbs } from "~/hooks/useBreadcrumbs";
import { useTranslation } from "~/hooks/useTranslation";

export function NotFoundPage() {
  const [search, setSearch] = useState("");
  const { translate, currentLanguage } = useTranslation();
  const { setBreadcrumbs } = useBreadcrumbs();

  return <span>{translate("NOT_FOUND")}</span>;
}
