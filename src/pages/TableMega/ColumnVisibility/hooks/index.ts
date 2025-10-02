import { useMemo, useState } from 'react';
import { useColumns, useTranslation } from '~/hooks';

export function useColumnVisibility() {
  const { translate } = useTranslation();
  const { columns } = useColumns();
  const [options, setOptions] = useState([
    {
      id: 'id',
      label: 'Id',
      show: true,
    },
    {
      id: 'avatar',
      label: 'Avatar',
      show: true,
    },
    {
      id: 'name',
      label: translate('NAME'),
      show: true,
    },
    {
      id: 'lastName',
      label: translate('LAST_NAME'),
      show: true,
    },
    {
      id: 'birthday',
      label: translate('BIRTHDAY'),
      show: true,
    },
    {
      id: 'email',
      label: 'Email',
      show: true,
    },
    {
      id: 'role',
      label: translate('ROLE'),
      show: true,
    },
    {
      id: 'isActive',
      label: translate('ACTIVE'),
      show: true,
    },
  ]);

  const columnVisibility = useMemo(() => {
    const finalResult: Record<string, boolean> = {};
    options.forEach(opt => {
      finalResult[opt.id] = opt.show;
    });
    return finalResult;
  }, [options]);

  return {
    columns,
    columnVisibility,
    options,
    setOptions,
    handleCheck: ({
      value,
      id,
    }: {
      value: boolean | 'indeterminate';
      id: string;
    }) => {
      setOptions(prev => {
        return prev.map(item => {
          if (item.id === id) {
            return {
              ...item,
              show: value as true | false,
            };
          }
          return item;
        });
      });
    },
  };
}
