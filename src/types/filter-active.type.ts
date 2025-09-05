export type TFilterActive = {
  id: string;
  column: string;
  type: TFilterType;
  value: string;
  labelColumn?: string;
  labelType?: string;
};

type TFilterType =
  | 'different'
  | 'equals'
  | 'bigger'
  | 'smaller'
  | 'starts'
  | 'ends'
  | 'contains';
