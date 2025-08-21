import { ChangeEvent } from 'react';
import { TCep, TCnpj, TCpf, TCurrency } from '.';

export type TBeforeChange = {
  removeNumber?: boolean;
  removeUpperCase?: boolean;
  removeLowerCase?: boolean;
  removeSpecialCharacter?: boolean;
  regexForReplace?: RegExp;
  fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  applyMask?: TCurrency | TCnpj | TCpf | TCep;
};
