import React, { useState } from 'react';

import Items from './Items';
import Card from '../UI/Card';
import Label from './Label';
import './Listing.css';

const Listing = (props) => {
 
  

  return (
    <div>
      <Card className='listings'>
        <Label/>
        
        {props.items.map(e => ( <Items title={e.title} type={e.type} amount={e.amount} date={e.date} code={e.code}/>))}
        
      </Card>
    </div>
  );
};

export default Listing;
