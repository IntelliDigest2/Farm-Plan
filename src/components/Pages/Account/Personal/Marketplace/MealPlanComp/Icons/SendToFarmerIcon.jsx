import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sendToFarmer } from "../../../../../../../store/actions/dataActions";
import SendIcon from '@mui/icons-material/Send';
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { editConfirmStatus } from "../../../../../../../store/actions/dataActions";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SendToFarmerIcon(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      farmerID: props.farmerID,
      receiversID: props.receiversID,
      // buyers_account_type: props.buyers_account_type,
      status: "IN PROGRESS",
      cart: props.cart,
      address: props.address,
      delivery_code: props.delivery_code,
      buyers_account_type: props.buyers_account_type,
      admin_id: props.admin_id
    };
    props.sendToFarmer(data).then((resp)=>{
    submitNotification("Success", " Items has been sent to farmer!");

    }).catch((err)=>{
      submitNotification("Error ", " Something went wrong, try again");
    });
    //props.editPurchaseStatus(data)
  };

  return (
    <>
      <Tooltip title="send Item to User">
        <IconButton
          aria-label="send Item to User"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <SendIcon fontSize="50" />
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
    sendToFarmer: (data) => dispatch(sendToFarmer(data)),
    editConfirmStatus: (data) => dispatch(editConfirmStatus(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendToFarmerIcon);
 