import React, { useState, useEffect } from "react";

// import buildShoppingList from "./Build";
import OrderItemsHeader from "./header";
import OrderItems from "./OrderItems";

import moment from "moment";

//When inputting items to the calendar, also send them to shopping list along with
// ingredients, mealName and  timestamp. (sent to file with week of year, year tag)

//All ingredients must be sent separately, so that people can add and remove items.

//When items are listed in the mealplan, they can select and remove ingredients from
//the meal that are then sent to firebase under "shoppingListData", year, week (1 .... 52)

export const OrderList = ({ tab, update, forceUpdate }) => {
  const [value, setValue] = useState(moment());
  return (
    <div className="calendar">
      <OrderItemsHeader value={value} setValue={setValue} />
      <OrderItems value={value} />
    </div>
  );
};
