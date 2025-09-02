import {
  DetailedHTMLProps,
  TdHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { TdDefaultInternal } from "../TdDefaultInternal";

type TTdWithEllipsisProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  title?: string;
};

export function TdWithEllipsis({ title, ...rest }: TTdWithEllipsisProps) {
  const ref = useRef<HTMLTableCellElement>(null);
  const [_, setIsFirstRender] = useState(false);

  function getTitle() {
    if (!ref.current) {
      return {};
    }
    if (ref.current?.offsetWidth < ref.current?.scrollWidth && !!title) {
      return { title: title };
    }
    return {};
  }

  // Hack to fist render and fill ref
  useEffect(() => {
    setTimeout(() => {
      setIsFirstRender(true);
    }, 1);
  }, []);

  return <TdDefaultInternal ref={ref} {...rest} {...getTitle()} />;
}
