import { getEditorUrl, managerClassNames } from '~/utils';

interface OpenInEditorProps {
  url?: string;
  line?: number;
}

export function OpenInEditor({ url, line = 1 }: OpenInEditorProps) {
  if (!import.meta.env.DEV || !url) return null;

  const editorUrl = getEditorUrl(url, line);
  if (!editorUrl) return null;

  return (
    <a
      href={editorUrl}
      className={managerClassNames([
        'absolute top-4 right-4 inline-flex items-center gap-2 text-sm',
        'hover:opacity-70 transition-all no-underline duration-300',
      ])}
    >
      <span>Abrir no Antigravity</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
