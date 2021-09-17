import React, { useState } from 'react';

import './ItemForm.css';

const ItemForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredType, setEnteredType] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: '',
  // });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const codeChangeHandler = (event) => {
    setEnteredCode(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const typeChangeHandler = (event) => {
    setEnteredType(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value };
    // });
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      type: enteredType,
      code: enteredCode
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredType('');
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredCode('');
  };

  return (<div>
    <form onSubmit={submitHandler}>
      <div className='new-item__controls'>
        <div className='new-item__control'>
          <div className='item__actions'>
          <h2>Add a product</h2>
          </div>
          <label>Name</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
          <label>Type</label>
          <input
            type='text'
            value={enteredType}
            onChange={typeChangeHandler}
          />

          <label>Post Code</label>
          <input
            type='text'
            value={enteredCode}
            onChange={codeChangeHandler}
          />

        </div>
        <div className='new-item__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-item__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div  className='item__actions'>
        <button type='submit'>Add Product</button>
     </div>
      
  
    </form>
    <br/>
    <button>Back</button></div>
  

  );
};

export default ItemForm;
