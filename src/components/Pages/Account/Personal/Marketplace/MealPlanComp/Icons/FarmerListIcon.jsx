import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PageviewIcon from '@mui/icons-material/Pageview';
import CircularProgress from '@mui/material/CircularProgress';

import {FarmersList} from "./FarmersList"
import Swal from 'sweetalert2';

//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function FarmerListIcon(props) {


  const [list, setList] = useState([]);
  const [cart, setCart] = useState(props.cart);
  const [city, setCity] = useState(props.city);
  const [address, setAddress] = useState(props.address)
  //shows edit modal
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

   // ...
   const fetchFarmers = async () => {
    setLoading(true); // Set loading to true when the button is clicked

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
          setLoading(false); // Set loading back to false when data is received
          setShow(true);
  
          console.log("this are available items", data.data)
       })
       .catch((err) => {
          console.log(err.message);
          Swal.fire({
            title: 'Success!',
            text: 'Item marked as delivered',
            icon: 'success',
          });
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
          }}
          disabled={loading} // Disable the button when loading is true

        >
          {loading ? (
            // Show a loading indicator while loading is true
            <CircularProgress size={24} />
          ) : (
            <PageviewIcon fontSize="inherit" />
          )}        
        </IconButton>
      </Tooltip>
      <FarmersList
        show={show}
        setShow={setShow}
        list={list}
        cart={props.cart}
        address={props.address}
        delivery_code={props.delivery_code}
        receiversID={props.receiversID}
        forceUpdate={props.forceUpdate}
        buyersAccountType={props.buyersAccountType}
      />
    </>
  );
}

export default FarmerListIcon;
