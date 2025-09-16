type TComponent = {
  label?: string;
  path?: string;
};

export type TOtherComponents = {
  prev?: TComponent | null;
  next?: TComponent | null;
};
