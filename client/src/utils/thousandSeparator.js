import { CURRENCY_SYMBOLS_REGEX, ONLY_NUMERICAL_REGEX, NOMINAL_REGEX } from 'constants/regex';

export const inputThousandSeparator = (value) => {
  const storeNumber = value.toString().replace(ONLY_NUMERICAL_REGEX, ''); //check only number should be

  let numberFormated = storeNumber;
  if (storeNumber !== '' && storeNumber !== null) {
    numberFormated = storeNumber.replace(NOMINAL_REGEX, '.');
  }

  return numberFormated;
};

export const removeThousandSeparator = (value = '') => {
  const nominalNonSeparator = value.split(CURRENCY_SYMBOLS_REGEX).join('');
  return nominalNonSeparator;
};

export const setThousandSeparatorNominal = (value) => {
  const thousandSeparatorNominal = inputThousandSeparator(value);
  return thousandSeparatorNominal;
};
