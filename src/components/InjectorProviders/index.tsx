import { BreadcrumbsProvider } from "~/hooks/useBreadcrumbs";
import { FontSizeProvider } from "~/hooks/useFontSize";
import { OtherComponentsProvider } from "~/hooks/useOtherComponents";
import "~/config/i18n";

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <BreadcrumbsProvider>
      <OtherComponentsProvider>
        <FontSizeProvider>{children}</FontSizeProvider>
      </OtherComponentsProvider>
    </BreadcrumbsProvider>
  );
}
