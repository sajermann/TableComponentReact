import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { _handleChangeDarkModeInDom } from '~/hooks/useDarkMode/utils';

const IDENTIFIER = `${import.meta.env.VITE_APPLICATION_IDENTIFIER}:darkMode`;

export const useDarkMode = create<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>()(
  persist(
    set => ({
      darkMode: true,
      toggleDarkMode: () =>
        set(state => {
          _handleChangeDarkModeInDom(!state.darkMode);
          return {
            ...state,
            darkMode: !state.darkMode,
          };
        }),
    }),
    {
      name: IDENTIFIER, // name of the item in the storage (must be unique)
    },
  ),
);

// self-executing function (função auto-executável)
(() => _handleChangeDarkModeInDom(useDarkMode.getState().darkMode))();

window.store = useDarkMode;
