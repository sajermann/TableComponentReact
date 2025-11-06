import { Row } from '@tanstack/react-table';
import jsonLogic from 'json-logic-js';
import { TFilterActive, TPerson } from '~/types';

export type TComplexFilter = {
  input: string;
  custom: TFilterActive[];
};

jsonLogic.add_operation('startsWith', (str, prefix) => {
  if (typeof str !== 'string' || typeof prefix !== 'string') return false;
  return str.startsWith(prefix);
});

jsonLogic.add_operation('endsWith', (str, prefix) => {
  if (typeof str !== 'string' || typeof prefix !== 'string') return false;
  return str.endsWith(prefix);
});

export const convertComplexFilterToJsonLogic = (filter: TComplexFilter) => {
  const filterRule: jsonLogic.RulesLogic<jsonLogic.AdditionalOperation> = {
    and: [],
  };

  const config = {
    different: '!=',
    equals: '==',
    bigger: '>',
    smaller: '<',
    starts: 'startsWith',
    ends: 'endsWith',
    contains: 'in',
  };

  for (const item of filter.custom) {
    if (item.type === 'contains') {
      filterRule.and.push({
        [config[item.type]]: [item.value, { var: item.column }],
      });
    } else {
      filterRule.and.push({
        [config[item.type]]: [{ var: item.column }, item.value],
      });
    }
  }

  filterRule.and.push({
    or: [
      { in: [filter.input, { var: 'email' }] },
      { in: [filter.input, { var: 'friends' }] },
    ],
  });

  return filterRule;
};

export const globalFilterFn = (row: Row<TPerson>, _: any, filters: any) => {
  try {
    const filterRule = convertComplexFilterToJsonLogic(filters);
    const result = jsonLogic.apply(filterRule, {
      ...row.original,
      friends: row.original.friends.map(f => f.name).join(' | '),
    });
    return result === undefined || result === true;
  } catch (error) {
    console.log({ error });
    return true;
  }
};
