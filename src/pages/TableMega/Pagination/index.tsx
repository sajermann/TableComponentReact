import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Backend } from "./components";
import { Frontend } from "./components/Frontend";

export function TableMegaPaginationPage() {
  const { translate } = useTranslation();
  return (
    <Section title={translate("PAGINATION")} variant="h1">
      {translate("IMPLEMENTS_PAGINATION_MODE")}
      <div className="flex flex-col gap-10">
        {/* <Backend /> */}
        <Frontend />
      </div>
    </Section>
  );
}
