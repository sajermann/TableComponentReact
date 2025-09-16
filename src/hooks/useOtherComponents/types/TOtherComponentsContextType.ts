import { Dispatch, SetStateAction } from 'react';
import { TOtherComponents } from './TOtherComponents';

export type TOtherComponentsContextType = {
  otherComponents: TOtherComponents;
  setOtherComponents: Dispatch<SetStateAction<TOtherComponents>>;
};
