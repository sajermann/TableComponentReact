import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from '../../hooks';

export function useChildren({
  title,
  children,
}: { title?: string; children: ReactNode }) {
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    const element = ref.current;
    setIsEllipsisActive(
      element
        ? element.offsetWidth < element.scrollWidth ||
            element.offsetHeight < element.scrollHeight
        : false,
    );
  }, [size]);

  const verifyEllipsis = useMemo(() => {
    if (title) {
      return title;
    }
    if (isEllipsisActive && typeof children === 'string') {
      return children;
    }
    return '';
  }, [title, children]);

  return {
    title: verifyEllipsis,
    ref,
  };
}
