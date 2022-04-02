import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense, selectExpense } from '../actions';

class DeleteBtn extends Component {
  removeExpense = () => {
    const { removeByID, expenseID } = this.props;

    removeByID(expenseID);
  }

  enableEditBtn = () => {
    const { isEditing, selectedExpense, expenseID } = this.props;
    isEditing();
    selectedExpense(expenseID);
  }

  render() {
    const { editingBool } = this.props;
    return (
      <>
        <button
          data-testid="edit-btn"
          type="button"
          onClick={ this.enableEditBtn }
        >
          Editar
        </button>
        <button
          data-testid="delete-btn"
          type="button"
          disabled={ editingBool }
          onClick={ this.removeExpense }
        >
          Excluir
        </button>
      </>
    );
  }
}

DeleteBtn.propTypes = {
  removeByID: propTypes.func.isRequired,
  expenseID: propTypes.number.isRequired,
  isEditing: propTypes.func.isRequired,
  selectedExpense: propTypes.func.isRequired,
  editingBool: propTypes.bool.isRequired,
};

const mapStateToProps = (store) => ({
  editingBool: store.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  removeByID: (id) => dispatch(removeExpense(id)),
  isEditing: () => dispatch(editExpense()),
  selectedExpense: (id) => dispatch(selectExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);
