import { useTranslation } from "~/hooks/useTranslation";
import { TSearchProps } from "../../types/search.type";
import { Input } from "../Input";

export function Search({ value, show, onChange, ...rest }: TSearchProps) {
  const { translate } = useTranslation();
  if (!show) return null;
  return (
    <Input
      {...rest}
      value={value}
      onChange={onChange}
      placeholder={translate("SEARCH")}
      type="search"
    />
  );
}
