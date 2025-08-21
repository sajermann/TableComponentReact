import { TCep, TCnpj, TCpf, TCurrency, TOnChangeCustom } from '../../types';
import { mask } from '../mask';

export async function onChangeCustom({
  e,
  onChange,
  onBeforeChange,
}: TOnChangeCustom) {
  if (!onBeforeChange && onChange) {
    onChange(e);
    return;
  }

  const temp = { ...e };
  let valueTemp = temp.target.value;

  if (onBeforeChange?.removeLowerCase) {
    valueTemp = valueTemp.replace(/[a-z]/g, '');
  }

  if (onBeforeChange?.removeUpperCase) {
    valueTemp = valueTemp.replace(/[A-Z]/g, '');
  }

  if (onBeforeChange?.removeNumber) {
    valueTemp = valueTemp.replace(/\d/g, '');
  }

  if (onBeforeChange?.removeSpecialCharacter) {
    valueTemp = valueTemp.replace(
      /[!@#$%&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
      '',
    );
  }

  if (onBeforeChange?.regexForReplace) {
    valueTemp = valueTemp.replace(onBeforeChange?.regexForReplace, '');
  }

  if ((onBeforeChange?.applyMask as TCurrency)?.currency) {
    valueTemp = mask.real({
      value: valueTemp,
      decimalPlace: (onBeforeChange?.applyMask as TCurrency).currency
        ?.decimalPlace,
    });
  }

  if ((onBeforeChange?.applyMask as TCnpj)?.cnpj) {
    valueTemp = mask.cnpj(valueTemp);
  }

  if ((onBeforeChange?.applyMask as TCpf)?.cpf) {
    valueTemp = mask.cpf(valueTemp);
  }

  if ((onBeforeChange?.applyMask as TCep)?.cep) {
    valueTemp = mask.cep(valueTemp);
  }

  temp.target.value = valueTemp;

  if (onBeforeChange?.fn && onChange) {
    const newEvent = onBeforeChange?.fn(temp);
    onChange(newEvent);
    return;
  }

  if (onChange) {
    onChange(temp);
  }
}
