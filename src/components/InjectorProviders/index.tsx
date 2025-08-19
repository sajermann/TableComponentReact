import { HashRouter } from "react-router";
import { BreadcrumbsProvider } from "~/hooks/useBreadcrumbs";
import { FontSizeProvider } from "~/hooks/useFontSize";
import "~/config/i18n";

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>{children}</FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
