import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableBtn from './TableBtn';

class TableHeader extends Component {
  getExchangeInfo = (exchangeRates, currency) => {
    const entries = Object.entries(exchangeRates);
    const getRate = entries.find(([key]) => key === currency)[1];

    const { name, ask } = getRate;
    const formattedName = name.split('/')[0];

    const currencyName = formattedName === 'Dólar Americano'
      ? `${formattedName.replace('Americano', 'Comercial')} `
      : formattedName;

    const data = { currencyName, ask };

    return data;
  }

  render() {
    const { expensesInfo } = this.props;

    const tableData = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <table>
        <thead>
          <tr>
            {tableData.map((field, index) => (<th key={ index }>{field}</th>))}
          </tr>
        </thead>
        <tfoot>
          {expensesInfo.map((expense) => {
            const {
              id, value, description, currency, method, tag, exchangeRates,
            } = expense;

            const { currencyName, ask } = this.getExchangeInfo(exchangeRates, currency);

            const fixedValue = parseFloat(value).toFixed(2);
            const fixedAsk = parseFloat(ask).toFixed(2);
            const conversionCurrency = 'Real';

            const convertedValue = (value * ask).toFixed(2);

            const deleteBtn = <TableBtn />;
            const rowInfo = [
              description, tag, method, fixedValue, currencyName, fixedAsk,
              convertedValue, conversionCurrency, deleteBtn,
            ];

            return (
              <tr key={ id }>
                {rowInfo.map((info, index) => (
                  <td key={ `id:${tableData[index]}` }>
                    {info === deleteBtn
                      ? <TableBtn expenseID={ id } />
                      : info }
                  </td>
                ))}
              </tr>
            );
          })}
        </tfoot>
      </table>
    );
  }
}

TableHeader.propTypes = {
  expensesInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  expensesInfo: store.wallet.expenses,
});

export default connect(mapStateToProps)(TableHeader);
