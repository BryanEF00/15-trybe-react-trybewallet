import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class DeleteBtn extends Component {
  removeExpense = () => {
    const { removeByID, expenseID } = this.props;

    removeByID(expenseID);
  }

  render() {
    return (
      <button
        data-testid="delete-btn"
        type="button"
        onClick={ this.removeExpense }
      >
        Excluir
      </button>
    );
  }
}

DeleteBtn.propTypes = {
  removeByID: propTypes.func.isRequired,
  expenseID: propTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeByID: (id) => dispatch(removeExpense(id)),
});

export default connect(null, mapDispatchToProps)(DeleteBtn);
