import { Config } from "../Config";
import { Version } from "../Version";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Version />
      <Config />
      {children}
    </>
  );
}
