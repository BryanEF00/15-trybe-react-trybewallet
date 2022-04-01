import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesForm extends Component {
  render() {
    const { currencyOptions } = this.props;

    return (
      <form>
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <label
          htmlFor="currency-input"
        >
          Moeda
          <select
            data-testid="currency-input"
            id="currency-input"
          >
            {currencyOptions.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                {currency}
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
          >
            <option value="cash">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="tag-input"
        >
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (store) => ({
  currencyOptions: store.wallet.currencies,
});

export default connect(mapStateToProps)(ExpensesForm);
