import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencyRate } from '../actions';
import Header from '../components/Header';

class Wallet extends Component {
  componentDidMount() {
    const { getCurrentCurrencyRate } = this.props;
    getCurrentCurrencyRate();
  }

  render() {
    return (
      <>
        <Header />
        <div>
          TrybeWallet
        </div>
      </>
    );
  }
}

Wallet.propTypes = {
  getCurrentCurrencyRate: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentCurrencyRate: () => dispatch(fetchCurrencyRate()),
});

export default connect(null, mapDispatchToProps)(Wallet);
