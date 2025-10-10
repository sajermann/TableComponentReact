import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  useDebouncedCallback,
  useLoadingLazy,
  useTranslation,
  useWindow,
} from "~/hooks";
import { managerClassNames } from "~/packages/Table/utils/managerClassNames";
import { TMenu } from "./types";
import { buildOptions, scrollToSection } from "./utils";

export function TableOfContents() {
  const { isLoadingLazy } = useLoadingLazy();
  const [optionsMenu, setOptionsMenu] = useState<TMenu[]>([]);
  const location = useLocation();
  const { scrollPosition } = useWindow();
  const { translate, currentLanguage } = useTranslation();

  const load = useDebouncedCallback(() => setOptionsMenu(buildOptions()), 100);

  useEffect(() => {
    load();
  }, [scrollPosition, location.pathname, currentLanguage, isLoadingLazy]);

  if (!optionsMenu.length) {
    return null;
  }

  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>{translate("TABLE_OF_CONTENTS")}</p>
      <nav>
        <ul>
          {optionsMenu.map((item) => (
            <li
              key={`#${item.anchor}`}
              className={managerClassNames([
                "hover:opacity-70 transition-opacity duration-300",
                {
                  "pl-6": item.type === "H2",
                  "pl-12": item.type === "H3",
                },
              ])}
            >
              <button
                className={managerClassNames({
                  "!text-primary-700 border-l-4 border-primary-700 pl-1":
                    item.active,
                })}
                onClick={() => scrollToSection(item.anchor)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
