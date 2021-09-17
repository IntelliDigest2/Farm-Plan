import React from 'react';

import ExpiryDate from './ExpDate';
import Card from '../UI/Card';
import './Items.css';

const Items = (props) => {
  return (
    <Card className='item'>
      <ExpiryDate date={props.date} />
      
      <div className='item__description'>
      <label><b>Name: </b>{props.title.toUpperCase()}</label>
        <label><b>Type: </b>{props.type}</label>
        <label><b>Post code: </b>{props.code}</label>
        <div className='item__price'>£{props.amount}</div>
 
        <button className="item-b">Buy</button></div>

    </Card>
  );
}

export default Items;
