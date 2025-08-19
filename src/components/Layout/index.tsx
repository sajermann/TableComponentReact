import { Config } from "../InjectorProviders/Config";
import { Version } from "../InjectorProviders/Version";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Version />
      <Config />
      {children}
    </>
  );
}
