import { CenterOptions } from "~/components/CenterOptions";
import { traditionalChilds } from "~/config/routes";
import { useTranslation } from "~/hooks";

export function TraditionalPattern() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-5 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl">
          <strong>{translate("TRADITIONAL_PATTERN")}</strong>
        </h1>
        <p>{translate("TRADITIONAL_PATTERN_MESSAGE_PRESENTATION")}</p>
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
      <CenterOptions options={traditionalChilds || []} />
    </main>
  );
}
