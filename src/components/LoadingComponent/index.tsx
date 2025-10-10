import { useEffect } from "react";
import { useLoadingLazy, useTranslation } from "~/hooks";
import { Icons } from "../Icons";

export function LoadingComponent() {
  const { translate } = useTranslation();
  const { setIsLoadingLazy } = useLoadingLazy();

  useEffect(() => {
    setIsLoadingLazy(true);
    return () => setIsLoadingLazy(false);
  }, []);

  return (
    <div className="w-fit flex gap-2 items-center">
      <span className="whitespace-nowrap">
        {translate("DATA_IS_LOADING_PLEASE_WAITING")}
      </span>
      <Icons nameIcon="loadingPoints" className="w-5 h-5" />
    </div>
  );
}
