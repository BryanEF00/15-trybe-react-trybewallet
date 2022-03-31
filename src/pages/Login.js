import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, this.loginValidation);
  }

  loginValidation = () => {
    const { email, password } = this.state;

    const regexTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const maxLength = 6;

    const validEmail = regexTest.test(email);
    const validPassword = password.length >= maxLength;

    const isInvalid = !(validEmail && validPassword);

    this.setState({ isDisabled: isInvalid });
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { email } = this.state;
    const { history, userEmail } = this.props;

    userEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
