import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveExpense } from '../actions';
import getCurrencyRate from '../services/api';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveDespenses = async () => {
    const currentRate = await getCurrencyRate();
    const currentData = currentRate.reduce((acc, currency) => ({
      ...acc, [currency[0]]: currency[1],
    }), {});

    this.setState({ exchangeRates: currentData }, () => {
      const { addExpenses } = this.props;
      addExpenses(this.state);
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    await this.saveDespenses();

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
    }));
  }

  render() {
    const { currencyOptions } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="currency-input"
        >
          Moeda
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencyOptions.map((currencyOption) => (
              <option
                key={ currencyOption }
                value={ currencyOption }
              >
                {currencyOption}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="method-input"
        >
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="tag-input"
        >
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencyOptions: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expenses) => dispatch(saveExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
