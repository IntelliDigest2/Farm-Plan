import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PageviewIcon from '@mui/icons-material/Pageview';
import {FarmersList} from "./FarmersList"

//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function FarmerListIcon(props) {


  const [list, setList] = useState([]);
  const [cart, setCart] = useState(props.cart);
  const [city, setCity] = useState(props.city)
  //shows edit modal
  const [show, setShow] = useState(false);

  console.log("testtt", cart, city)

   // ...
   const fetchFarmers = async () => {
    await fetch('https://us-central1-itracker-development.cloudfunctions.net/getFarmersInLocationWithProducts/farmers', {
       method: 'POST',
       body: JSON.stringify({
          cart: cart,
          city: city,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((response) => response.json())
       .then((data) => {
          setList(data.data);
          console.log("this are avilable items", data.data)
       })
       .catch((err) => {
          console.log(err.message);
       });
 };

  return (
    <>
      <Tooltip title="Check with farmers">
        <IconButton
          className="edit"
          aria-label="Check with farmers"
          sx={{ ml: 2 }}
          onClick={() => {
            fetchFarmers();
            setShow(true);
          }}
        >
          <PageviewIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <FarmersList
        show={show}
        setShow={setShow}
        list={list}
        cart={props.cart}
        receiversID={props.receiversID}
        forceUpdate={props.forceUpdate}
      />
    </>
  );
}

export default FarmerListIcon;
