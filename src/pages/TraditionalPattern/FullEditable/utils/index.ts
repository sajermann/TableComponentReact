import { Dispatch, FormEvent, SetStateAction } from 'react';
import { TPerson } from '~/types';

export function getFormattedValues(
  data: Record<string, unknown>,
  prop: string,
) {
  return Object.entries(data)
    .filter(([key]) => key.startsWith(`${prop}-`))
    .map(([key, value]) => ({
      row: Number(key.split('-')[1]),
      value,
    }));
}

export function handleFormSubmit({
  event,
  setData,
}: {
  event?: FormEvent<HTMLFormElement>;
  setData: Dispatch<SetStateAction<TPerson[]>>;
}) {
  event?.preventDefault();
  const formData = new FormData(event?.currentTarget);
  const dataObj = Object.fromEntries(formData.entries());
  const resultName = getFormattedValues(dataObj, 'name');
  const resultLastName = getFormattedValues(dataObj, 'lastName');
  const resultBirthday = getFormattedValues(dataObj, 'birthday');
  const resultRole = getFormattedValues(dataObj, 'role');
  const resultIsActive = getFormattedValues(dataObj, 'isActive');
  setData(prev => {
    return prev.map((item, index) => {
      return {
        ...item,
        name: resultName.find(r => r.row === index)?.value || '',
        lastName: resultLastName.find(r => r.row === index)?.value || '',
        birthday: resultBirthday.find(r => r.row === index)?.value || '',
        role: resultRole.find(r => r.row === index)?.value || 'User',
        isActive: resultIsActive.find(r => r.row === index)?.value === 'on',
      } as TPerson;
    });
  });
}
