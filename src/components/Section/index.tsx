import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { managerClassNames } from '~/utils';
import { OpenInEditor } from '../OpenInEditor';

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
  url?: string;
};

export const Section = memo(
  ({ children, className, title, url, variant }: Props) => (
    <section
      className={managerClassNames([
        'flex flex-col gap-2 w-fit relative',
        { [className as string]: className },
      ])}
    >
      <OpenInEditor url={url} />
      {title && variant && <CustomHeading title={title} variant={variant} />}
      {children}
    </section>
  ),
);
