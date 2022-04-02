import { RECIEVE_CURRENCY_RATE, REMOVE_EXPENSE, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const getCurrencyAbbreviation = (currencies) => currencies
  .map(([key]) => key)
  .filter((value) => value !== 'USDT');

const filterExpenses = (state, id) => state
  .filter((expenses) => expenses.id !== id);

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIEVE_CURRENCY_RATE:
    return {
      ...state,
      currencies: getCurrencyAbbreviation(action.currencies),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: filterExpenses(state.expenses, action.id),
    };

  default: return state;
  }
};

export default wallet;
