import { BreadcrumbsProvider } from "~/hooks/useBreadcrumbs";
import { FontSizeProvider } from "~/hooks/useFontSize";
import { OtherComponentsProvider } from "~/hooks/useOtherComponents";
import "~/config/i18n";
import { Config } from "./Config";
import { Version } from "./Version";

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbsProvider>
      <OtherComponentsProvider>
        <Version />
        <Config />
        <FontSizeProvider>{children}</FontSizeProvider>
      </OtherComponentsProvider>
    </BreadcrumbsProvider>
  );
}
