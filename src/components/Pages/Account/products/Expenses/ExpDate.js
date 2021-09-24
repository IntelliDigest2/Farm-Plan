import React from 'react';

import './ExpDate.css';

const ExpDate = (props) => {
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();

  return (
    <div className='exp-date'>
      <label>EXPIRY</label>
      <div className='exp-date__month'>{month}</div>
      <div className='exp-date__day'>{day}</div>
      <div className='exp-date__year'>{year}</div>
    </div>
  );
};

export default ExpDate;
