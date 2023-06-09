import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LoyaltyIcon from '@mui/icons-material/Loyalty';import { addToSales } from "../../../../../../store/actions/supplierActions/supplierData"

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddToSalesIcon(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      upload: {
        productName: props.productName,
        imageURL: props.imageURL,
        productDescription: props.productDescription,
        productQty: props.productQty,
        productMeasure:props.productMeasure,
        productPrice:props.productPrice,
        productCurrency:props.productCurrency,
        companyID: props.companyID,
        region: props.region,
        city: props.city,
        companyName: props.companyName,
        productID: props.id,
        createdAt: props.createdAt
      },
    };
    props.addToSales(data);
    submitNotification("Success", `${data.upload.productName}` + " added to sals list!");
  };


  return (
    <>
      <Tooltip title="Add To Sales">
        <IconButton
          aria-label="Add To Sales"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <LoyaltyIcon fontSize="25" />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToSales: (data) => dispatch(addToSales(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddToSalesIcon);
