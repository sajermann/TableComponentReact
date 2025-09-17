import {
  useChildMatches,
  useLoaderData,
  useMatches,
  useRouter,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { CenterOptions } from "~/components/CenterOptions";
import { useTranslation } from "~/hooks/useTranslation";

const APPLICATION_NAME = import.meta.env.VITE_APPLICATION_NAME;

export function Home() {
  const { translate } = useTranslation();
  const data = useLoaderData({ from: "/" });

  const matchs = useMatches();
  const childMatches = useChildMatches();
  // const a = useRouter();
  // const currentRoute = a.flatRoutes.find(
  //   (route: { _fullPath: string }) => route._fullPath === location.pathname
  // );
  console.log({ matchs, childMatches });
  const options = useMemo(() => {
    return data?.options || [];
  }, [data]);

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl">
          <strong>{`${translate("WELCOME")} - ${APPLICATION_NAME}`}</strong>
        </h1>
        <p>{translate("HOME_MESSAGE_PRESENTATION")}</p>
        <a
          href="https://github.com/sajermann/BoilerplateComponentReact/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
            alt="github"
            height="18"
            style={{ borderRadius: 5, marginRight: 5 }}
          />
        </a>
      </div>
      <CenterOptions options={options} />
    </main>
  );
}
