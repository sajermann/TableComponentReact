import { useLoaderData } from "@tanstack/react-router";
import { CenterOptions } from "~/components/CenterOptions";
import { useTranslation } from "~/hooks/useTranslation";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function Home() {
  const { translate } = useTranslation();
  const data = useLoaderData({ from: "/" });

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl">
          <strong>{`${translate("WELCOME")} - ${APPLICATION_NAME}`}</strong>
        </h1>
        <p>{translate("HOME_MESSAGE_PRESENTATION")}</p>
        <div className="flex gap-2">
          <a
            href="https://github.com/sajermann/TableComponentReact"
            target="_blank"
            rel="noreferrer"
            className="bg-black rounded-sm p-2 flex gap-2 h-7 items-center text-sm font-bold !text-white"
          >
            <img src="./github.png" alt="github" className="w-4.5" />
            Github
          </a>
          <a
            href="https://codesandbox.io/p/github/sajermann/TableComponentReact/develop"
            target="_blank"
            rel="noreferrer"
            className="bg-black rounded-sm p-2 flex gap-2 h-7 items-center text-sm font-bold !text-white"
          >
            <img
              src="./codesandbox.webp"
              alt="codesandbox"
              className="w-4 invert"
            />
            Codesandbox
          </a>
        </div>
      </div>
      <CenterOptions options={data?.options || []} />
    </main>
  );
}
