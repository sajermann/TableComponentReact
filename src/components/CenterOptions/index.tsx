import { Link, useRouter } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";
import { useTranslation } from "~/hooks";
import { useRoutesMenu } from "~/hooks/useRoutesMenu";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";

type TCenterOptionsProps = {
  options: {
    label: string;
    path: string;
    className?: string;
  }[];
};

export function CenterOptions({ options }: TCenterOptionsProps) {
  const { translate } = useTranslation();
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {options.map((opt) => (
        <div
          key={opt.path}
          className={managerClassNames([
            "flex flex-col border border-solid dark:border-white",
            "text-xl overflow-auto rounded-2xl w-64",
            { [opt.className as string]: opt.className },
          ])}
        >
          <header className="h-16 p-2 flex justify-center items-center rounded-t-2xl">
            {translate(opt.label)}
          </header>

          <footer className="h-16 flex items-center justify-center">
            <Link
              to={opt.path}
              className={managerClassNames([
                "flex flex-col items-center justify-center gap-1 p-1",
                "text-white duration-500 transition-colors text-sm",
                "hover:text-primary-700 hover:opacity-70",
                "transition-opacity duration-300",
              ])}
            >
              <EyeIcon width="2rem" height="2rem" />
              Demo
            </Link>
          </footer>
        </div>
      ))}
    </div>
  );
}
