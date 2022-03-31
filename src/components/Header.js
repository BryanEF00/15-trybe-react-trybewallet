import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { loginEmail } = this.props;
    return (
      <header>
        <div
          data-testid="email-field"
        >
          {loginEmail}
        </div>
        <div
          data-testid="total-field"
        >
          0
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
};

const mapStateToProps = (store) => ({
  loginEmail: store.user.email,
});

export default connect(mapStateToProps)(Header);
