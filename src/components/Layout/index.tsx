import { Config, Version } from "~/components";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Version />
      <Config />
      {children}
    </>
  );
}
