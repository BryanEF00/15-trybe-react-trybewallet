import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  updateTotal = () => {
    const { totalExpenses } = this.props;

    const getExpenses = totalExpenses.map((expense) => {
      const { exchangeRates, currency, value } = expense;

      const findRate = Object.values(exchangeRates)
        .find((rate) => rate.code === currency).ask;

      return parseFloat(findRate * value);
    });

    const initialValue = 0;
    const sum = getExpenses.reduce((acc, expense) => acc + expense, 0);

    const emptyArray = totalExpenses.length === 0
      ? initialValue.toFixed(2)
      : sum.toFixed(2);

    return emptyArray;
  };

  render() {
    const { loginEmail } = this.props;
    return (
      <header>
        <div
          data-testid="email-field"
        >
          {loginEmail}
        </div>
        <div>
          {'R$ '}
          <span data-testid="total-field">{this.updateTotal()}</span>
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  loginEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  loginEmail: store.user.email,
  totalExpenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
