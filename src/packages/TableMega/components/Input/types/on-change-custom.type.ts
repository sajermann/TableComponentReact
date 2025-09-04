import { ChangeEventHandler } from 'react';
import { TBeforeChange } from '.';

export type TOnChangeCustom = {
  e: React.ChangeEvent<HTMLInputElement>;
  onBeforeChange?: TBeforeChange;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
