import React, { useState, useEffect } from "react";

// import buildShoppingList from "./Build";
import ShoppingListHeader from "./header";
import ShopItems from "./shop";

import moment from "moment";

//When inputting items to the calendar, also send them to shopping list along with
// ingredients, mealName and  timestamp. (sent to file with week of year, year tag)

//All ingredients must be sent separately, so that people can add and remove items.

//When items are listed in the mealplan, they can select and remove ingredients from
//the meal that are then sent to firebase under "shoppingListData", year, week (1 .... 52)

export const ShoppingList = ({ tab, update, forceUpdate }) => {
  const [value, setValue] = useState(moment());
  return (
    <div className="calendar">
      <ShoppingListHeader value={value} setValue={setValue} />
      <ShopItems value={value} tab={tab} />
    </div>
  );
};
