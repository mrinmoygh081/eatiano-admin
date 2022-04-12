import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses }) => {
  const expenseList = expenses.map((expense) => {
    return <ExpenseItem key={expense.expense_id} expense={expense} />;
  });

  return (
    <div className='grid gap-20 my-10 md:my-16 lg:my-28 lg:grid-cols-4 md:grid-cols-3 place-content-center place-items-center'>
      {expenseList}
    </div>
  );
};

export default ExpenseList;
