import React from 'react';
import Header from '../components/Header';
import fetchApi from '../services/api';

class Wallet extends React.Component {
  async componentDidMount() {
    const test = await fetchApi();

    console.log(test);
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

export default Wallet;
