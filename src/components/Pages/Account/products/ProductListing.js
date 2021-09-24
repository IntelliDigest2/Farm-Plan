import React, {useState, Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { MobileView, BrowserView } from 'react-device-detect';

// import NewItem from './components/NewItem/NewItem';
// import Listing from './components/Expenses/Listing';

import NewItem from './NewItem/NewItem';
import Listing from './Expenses/Listing';


const Data = [
  {
    id: 'e1',
    title: 'Minced beef',
    amount: 4.12,
    date: new Date(2021, 9, 14),
    type: "Meat",
    code: "EH11 2AB"
  },
  { id: 'e2', title: 'Carrots', amount: 9.49, date: new Date(2021, 12, 12), type: "Vegetable", code: "EH1 2CA"},
  {
    id: 'e3',
    title: 'Sausage',
    amount: 2.67,
    date: new Date(2021, 9, 28),
    type: "Meat",
    code: "EH9 2AB"
  },
  {
    id: 'e4',
    title: 'Banana',
    amount: 450,
    date: new Date(2021, 5, 12),
    type: "Fruit",
    code: "EH11 2AB"

  },
];


const ProductListing = () => {
  const [e, setE] = useState(Data);
  const addEHandler = e => {
    setE(prevE => {
      return [e, ...prevE];
    });
  };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  return (
    <>
      <MobileView>
        <div style={{marginTop: "20%", marginBottom: "20%"}}>
          <NewItem onAddE={addEHandler} />
          <Listing items={e} />
        </div>
      </MobileView>

      <BrowserView>
        <div style={{marginTop: "5%", marginBottom: "5%"}}>
          <NewItem onAddE={addEHandler} />
          <Listing items={e} />
        </div>
      </BrowserView>
    </>
  );
}

export default ProductListing;
