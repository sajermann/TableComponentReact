import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Backend, Frontend } from "./components";

export function PaginationPage() {
  const { translate } = useTranslation();

  return (
    <Section title={translate("PAGINATION")} variant="h1">
      {translate("IMPLEMENTS_PAGINATION_MODE")}
      <div className="flex flex-col gap-10">
        <Frontend />
        <Backend />
      </div>
    </Section>
  );
}
