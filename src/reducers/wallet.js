import {
  EDIT_EXPENSE, RECIEVE_CURRENCY_RATE,
  REMOVE_EXPENSE, SAVE_EDIT, SAVE_EXPENSE, SELECT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  selectedToEdit: {},
};

const getCurrencyAbbreviation = (currencies) => currencies
  .map(([key]) => key)
  .filter((value) => value !== 'USDT');

const filterExpenses = (state, id) => state
  .filter((expenses) => expenses.id !== id);

const selectExpense = (state, id) => state
  .find((expenses) => expenses.id === id);

const updateExpenses = (state, editData) => state.map((expense) => {
  if (expense.id === editData.id) {
    return { ...expense, ...editData };
  }
  return expense;
});

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
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
    };
  case SELECT_EXPENSE:
    return {
      ...state,
      selectedToEdit: selectExpense(state.expenses, action.id),
    };
  case SAVE_EDIT:
    return {
      ...state,
      isEditing: false,
      selectedToEdit: {},
      expenses: updateExpenses(state.expenses, action.editData),
    };

  default: return state;
  }
};

export default wallet;
