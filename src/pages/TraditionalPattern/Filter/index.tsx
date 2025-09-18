import { Section } from "~/components";
import { useTranslation } from "~/hooks";
import { Complex } from "./components/Complex";
import { Simple } from "./components/Simple";

export function FilterPage() {
  const { translate } = useTranslation();

  return (
    <Section title={translate("FILTER")} variant="h1">
      {translate("IMPLEMENTS_FILTER_MODE")}

      <div className="flex flex-col gap-5">
        <Simple />
        <Complex />
      </div>
    </Section>
  );
}
