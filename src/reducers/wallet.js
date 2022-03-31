import { RECIEVE_CURRENCY_RATE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const getCurrencyAbbreviation = (currencies) => currencies
  .map(([key]) => key)
  .filter((value) => value !== 'USDT');

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIEVE_CURRENCY_RATE:
    return {
      ...state,
      currencies: getCurrencyAbbreviation(action.currencies),
    };

  default: return state;
  }
};

export default wallet;
