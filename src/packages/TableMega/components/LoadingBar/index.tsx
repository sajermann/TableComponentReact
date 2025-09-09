import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTableMega } from "../../hooks";
import { managerClassNames } from "../../utils/managerClassNames";

type TProps = {
  show?: boolean;
  external?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  internal?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
};

export function LoadingBar({ show, external, internal }: TProps) {
  const { table } = useTableMega();
  const [customWidth, setCustomWidth] = useState(97);

  function frame() {
    setCustomWidth((prev) => {
      if (prev > 99) {
        return prev - 99;
      }
      return prev + 0.1;
    });
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (show) {
      timerId = setInterval(frame, 0.01);
    } else {
      clearInterval(timerId || 0);
    }
    return () => clearInterval(timerId || 0);
  }, [show]);
  if (!show) return null;
  return (
    <tr>
      <th colSpan={table.getVisibleFlatColumns().length}>
        <div
          className={managerClassNames([
            { "bg-gray-300 rounded-bl-sm rounded-br-sm": true },
            { [external?.className as string]: external?.className },
          ])}
        >
          <div
            className={managerClassNames([
              {
                "bg-gray-500 text-center h-1 rounded-bl-sm rounded-br-sm": true,
              },
              { [internal?.className as string]: internal?.className },
            ])}
            style={{ width: `${customWidth}%` }}
          />
        </div>
      </th>
    </tr>
  );
}
