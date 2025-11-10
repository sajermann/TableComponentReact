import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { TBeforeChange } from '../types';
import { onChangeCustom } from '../utils';

type TUseInputProps = {
  debounce?: number;
  onBeforeChange?: TBeforeChange;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
export const useInput = ({
  debounce,
  onBeforeChange,
  onChange,
}: TUseInputProps) => {
  const [event, setEvent] = useState<ChangeEvent<HTMLInputElement>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debounce && event) {
        onChangeCustom({
          e: event,
          onBeforeChange,
          onChange,
        });
      }
    }, debounce);

    return () => clearTimeout(timer);
  }, [event]);

  return {
    event,
    setEvent,
    onChangeInternal: (e: ChangeEvent<HTMLInputElement>) => {
      if (!debounce) {
        onChangeCustom({
          e,
          onBeforeChange,
          onChange,
        });
        return;
      }
      setEvent(e);
    },
  };
};
