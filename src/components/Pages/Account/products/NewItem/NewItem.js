import React from 'react';

import ItemForm from './ItemForm';
import './NewItem.css';

const NewItem = (props) => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddE(expenseData);
  };

  return (
    <div className='new-item'>
      <ItemForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewItem;
