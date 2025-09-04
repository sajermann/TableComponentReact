import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { TOnChangeCustom } from '../../types';
import { onChangeCustom } from '../onChangeCustom';

type TPreOnChange = TOnChangeCustom & {
  debounce?: number;
  setEvent: Dispatch<SetStateAction<ChangeEvent<HTMLInputElement> | undefined>>;
};
export async function preOnChange({
  e,
  debounce,
  onBeforeChange,
  onChange,
  setEvent,
}: TPreOnChange) {
  if (!debounce) {
    onChangeCustom({
      e,
      onBeforeChange,
      onChange,
    });
    return;
  }
  setEvent(e);
}
