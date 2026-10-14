import {
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  useEffect,
  useRef,
} from 'react';
import { managerClassNames } from '~/utils';
import { useDevToolsStore } from '../RoutesConfig/Sidebar/DevTools/store';

interface ICustomHeadingProps {
  title: string;
  variant: 'h1' | 'h2' | 'h3';
}

const variantClassMap: Record<ICustomHeadingProps['variant'], string> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
};

const CustomHeading = memo(({ title, variant }: ICustomHeadingProps) => {
  const Tag = variant;

  return (
    <Tag data-tableofcontents="true" className={variantClassMap[variant]}>
      {title}
    </Tag>
  );
});

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  title?: string;
  variant?: 'h1' | 'h2' | 'h3';
};

export const Section = memo(
  ({ children, className, title, variant }: Props) => {
    const isFirstMount = useRef(true);
    const increment = useDevToolsStore(s => s.incrementRenderCount);

    useEffect(() => {
      if (!import.meta.env.DEV) return;
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }
      // Rastreia apenas a Section principal da página (h1 ou h2) para não duplicar em sub-sections
      if (variant === 'h1' || variant === 'h2') {
        increment();
      }
    });

    return (
      <section
        className={managerClassNames([
          'flex flex-col gap-2 w-fit relative',
          { [className as string]: className },
        ])}
      >
        {title && variant && <CustomHeading title={title} variant={variant} />}
        {children}
      </section>
    );
  },
);
