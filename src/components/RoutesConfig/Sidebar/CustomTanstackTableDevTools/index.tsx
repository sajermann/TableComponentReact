import { TableDevtoolsPanel } from '@tanstack/react-table-devtools';
import {
  PanelBottomClose,
  PanelBottomOpen,
  TableProperties,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { managerClassNames } from '~/utils';

export function CustomTanstackTableDevTools() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={managerClassNames([
          'w-full flex items-center justify-between gap-2 p-2 rounded-lg border',
          'text-xs hover:bg-neutral-500/10 transition-colors duration-200 cursor-pointer',
          { 'bg-neutral-500/10 border-orange-500/40': isOpen },
        ])}
      >
        <div className="flex items-center gap-2 truncate">
          <TableProperties className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="truncate">
            {isOpen ? 'Fechar Table DevTools' : 'Abrir Table DevTools'}
          </span>
        </div>
        {isOpen ? (
          <PanelBottomClose className="w-3.5 h-3.5 opacity-60 shrink-0" />
        ) : (
          <PanelBottomOpen className="w-3.5 h-3.5 opacity-60 shrink-0" />
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 z-50 bg-[#1f1f1f] p-4 rounded-2xl"
            onScroll={() => console.log('scroll')}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-7 right-10 p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Fechar DevTools"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="h-full overflow-auto">
              <TableDevtoolsPanel devtoolsOpen={isOpen} theme="dark" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
