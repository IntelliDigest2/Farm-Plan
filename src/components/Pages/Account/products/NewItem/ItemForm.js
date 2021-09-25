import React, { useState } from 'react';
import {Link} from "react-router-dom"

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
        <div className='new-item__control'>
          <div className='item__actions'>
          <h2 style={{fontWeight: 600, marginBottom: "3.5%"}}>Add a product</h2>
          </div>
          <label style={{marginBottom: "0.25%"}}>Name</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
          <label style={{marginTop: "2%", marginBottom: "0.25%"}}>Type</label>
          <input
            type='text'
            value={enteredType}
            onChange={typeChangeHandler}
          />

          <label style={{marginTop: "2%", marginBottom: "0.25%"}}>Post Code</label>
          <input
            type='text'
            value={enteredCode}
            onChange={codeChangeHandler}
          />

          <label style={{marginTop: "2%", marginBottom: "0.25%"}}>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
          <label style={{marginTop: "2%", marginBottom: "0.25%"}}>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
            style={{marginBottom: "2.5%"}}
          />
        </div>
      <div  className='item__actions'>
        <button style={{marginBottom: "-1%"}} type='submit'>Add Product</button>
     </div>
      
  
    </form>
    <br/>
    <Link to="/account"><button type="button">Back</button></Link></div>
  

  );
};

export default ItemForm;
