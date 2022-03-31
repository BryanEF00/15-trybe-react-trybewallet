import getCurrencyRate from '../services/api';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCY_RATE = 'REQUEST_CURRENCY_RATE';
export const RECIEVE_CURRENCY_RATE = 'RECIEVE_CURRENCY_RATE';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
export const requestCurrencyRate = () => ({ type: REQUEST_CURRENCY_RATE });
export const recieveCurrencyRate = (currencies) => ({
  type: RECIEVE_CURRENCY_RATE, currencies,
});

export function fetchCurrencyRate() {
  return async (dispatch) => {
    const data = await getCurrencyRate();
    dispatch(recieveCurrencyRate(data));
  };
}
