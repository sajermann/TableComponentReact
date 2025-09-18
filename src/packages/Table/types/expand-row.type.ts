import { Row } from '@tanstack/react-table';
import { CSSProperties } from 'react';

type TCommonProps = {
  style?: CSSProperties;
  className?: string;
};

export type TExpandRow<T> = {
  render: (data: Row<T>) => React.ReactNode;
  parentTrProps?: TCommonProps;
  expandedTrProps?: TCommonProps;
};
