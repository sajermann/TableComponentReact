import {
  DetailedHTMLProps,
  TdHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";

type Props = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  children: React.ReactNode;
  title?: string;
};

export function Td({ children, title, ...rest }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);
  const [_, setIsFirstRender] = useState(false);

  function isEllipsisActive() {
    if (!ref.current) {
      return false;
    }
    return ref.current?.offsetWidth < ref.current?.scrollWidth;
  }

  // Hack to fist render and fill ref
  useEffect(() => {
    setTimeout(() => {
      setIsFirstRender(true);
    }, 1);
  }, []);

  return (
    <td
      {...rest}
      ref={ref}
      title={isEllipsisActive() ? title : ""}
      className={styles.td}
    >
      {children}
    </td>
  );
}
