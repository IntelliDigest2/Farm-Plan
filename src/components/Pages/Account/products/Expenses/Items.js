import React from 'react';

import ExpiryDate from './ExpDate';
import Card from '../UI/Card';
import './Items.css';
import { BrowserView, MobileView } from 'react-device-detect';

const Items = (props) => {
  return (
    <>
      <BrowserView>
        <Card className='item'>
          <div style={{height: "7rem"}}>
            <ExpiryDate date={props.date} />
            
            <div className='item__description' style={{marginLeft: "17.5%", marginTop: "-12.5%"}}>
              <label><b>Name: </b>{props.title.toUpperCase()}</label>
              <label><b>Type: </b>{props.type}</label>
              <label><b>Post code: </b>{props.code}</label>
            </div>
          

            <div className='item__price' style={{width: "10%", marginLeft: "85%", marginTop: "-100px"}}>£{props.amount}</div>
    
            <button className="item-b" style={{width: "10%", marginLeft: "85%", marginTop: "5px"}}>Buy</button>

            </div>

        </Card>
      </BrowserView>

      <MobileView>
        <Card className='item'>
          <div>
            <ExpiryDate date={props.date} />
            
            <div className='item__description' style={{marginLeft: "35%", marginTop: "-32.5%"}}>
            <label><b>Name: </b>{props.title.toUpperCase()}</label>
              <label><b>Type: </b>{props.type}</label>
              <label><b>Post code: </b>{props.code}</label>
              <div className='item__price'>£{props.amount}</div>
      
              <button className="item-b">Buy</button></div>
          </div>

        </Card>
      </MobileView>
    </>
  );
}

export default Items;
