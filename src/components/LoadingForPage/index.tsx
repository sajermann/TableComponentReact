import { useTranslation } from "~/hooks";
import { Icons } from "../Icons";

export function LoadingPage() {
  const { translate } = useTranslation();
  return (
    <div className="w-fit flex gap-2 items-center">
      <span className="whitespace-nowrap">
        {translate("DATA_IS_LOADING_PLEASE_WAITING")}
      </span>
      <Icons nameIcon="loadingPoints" className="w-5 h-5" />
    </div>
  );
}
