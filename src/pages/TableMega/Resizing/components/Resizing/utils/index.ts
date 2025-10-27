import { getEnv } from '~/utils/getEnv';

const IDENTIFIER = `${getEnv('APPLICATION_IDENTIFIER')}:resizing`;

const DEFAULT = {
  id: 100,
  avatar: 60,
  name: 100,
  lastName: 100,
  birthday: 100,
  email: 100,
  role: 100,
  isActive: 100,
  friends: 100,
};

type TResizingProps = {
  columnSizing: {
    [index: string]: number;
  };
};
export function onResizing(dataSizing: TResizingProps) {
  const keys = Object.keys(dataSizing.columnSizing);
  if (keys.length === 0) return;

  const saveds = localStorage.getItem(IDENTIFIER);

  const newDefault = saveds ? JSON.parse(saveds) : { ...DEFAULT };

  for (const item of keys) {
    newDefault[item] = dataSizing.columnSizing[item];
  }
  localStorage.setItem(IDENTIFIER, JSON.stringify(newDefault));
}
