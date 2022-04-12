import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Expenses } from '../../context/expensesContext';

const ExpenseItem = ({ expense }) => {
  const expensesCtx = useContext(Expenses);

  const deleteExpense = () => {
    expensesCtx.deleteExpense(expense.expense_id);
  };

  return (
    <div>
      <h6 className='mb-3 font-medium text-center text-gray-100 lg:text-lg'>
        Expense Name: {expense.name}
      </h6>
      <h6 className='mb-4 font-medium text-center text-gray-200'>
        Expense Amount: {expense.amount}
      </h6>
      <p className='mb-4 text-sm font-light leading-relaxed text-center text-gray-300 md:mb-5'>
        Time Period For Expense: {expense.time_period}
      </p>

      <h6 className='mb-4 font-medium text-center text-gray-200'>
        Created At: {expense.created_at}
      </h6>

      <button
        className='text-brand-text hover:text-red-600'
        onClick={deleteExpense}
      >
        Delete
      </button>
    </div>
  );
};

export default ExpenseItem;
