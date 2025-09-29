import { ErrorComponentProps } from "@tanstack/react-router";
import { useTranslation } from "~/hooks";
import { Button } from "../Button";

export function ErrorComponent({ error }: Partial<ErrorComponentProps>) {
  const { translate } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <span>{translate("ITS_NOT_GOOD_MESSAGE")}</span>
      <span>{translate("ERROR_MESSAGE")}:</span>
      error,
      <span className="italic text-sm">{error?.message}</span>
      <Button
        variant="outlined"
        colorStyle="mono"
        onClick={() => window.location.reload()}
      >
        {translate("RELOAD")}
      </Button>
    </div>
  );
}
