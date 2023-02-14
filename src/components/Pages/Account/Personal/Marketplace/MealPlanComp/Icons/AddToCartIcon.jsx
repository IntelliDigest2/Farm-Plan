import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { removeFromShop, newRemoveFromShop } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddToCartIcon(props) {

  const [cart, setCart] = useState([]);


const addToCart = (ingr) => {
  setCart([...cart, ingr]);
  };

  const removeFromCart = (ingr) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== ingr.id);
    setCart(hardCopy);
    };

  const cartItems = cart.map((ingr, index) => (
    <List>
      <ListItem
          key={`ingr${index}`}
          className="list"
          style={{ alignItems: "flex-end" }}
        >      
        <b>{`${ingr.data}: `}  </b> &nbsp; {`${ingr.quantity} ${ingr.measure}`} &nbsp;
        {/* <input type="text" value={ingr.data} /> */}
        {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
        <HighlightOffIcon onClick={() => removeFromCart(ingr)} />
      </ListItem>
    </List>
    ));



  function notify(){
    submitNotification(`${props.item}` + " added to cart");
   }

  return (
    <>
      <Tooltip title="Add to cart">
        <IconButton
          aria-label="Add to cart"
          sx={{ ml: 2 }}
          onClick={() => {
            notify();
          }}
        >
          <AddCircleOutlineIcon fontSize="25" />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToInventory: (data) => dispatch(addToInventory(data)),
    removeFromShop: (data) => dispatch(removeFromShop(data)),
    newRemoveFromShop: (data) => dispatch(newRemoveFromShop(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartIcon);
