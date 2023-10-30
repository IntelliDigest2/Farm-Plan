import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sendToUser } from "../../../../../../../store/actions/dataActions";
import SendIcon from '@mui/icons-material/Send';
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { editPurchaseStatus } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SendItemIcon(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      uid: props.uid,
      refID: props.refID,
      status: "IN PROGRESS",
      upload: {
        cart: props.cart,
        refID: props.refID,
        uid: props.uid,
        status: "IN PROGRESS"
      },
      buyers_account_type: props.buyers_account_type
    };
    props.sendToUser(data).then((resp)=>{
    submitNotification("Success", " Items has been sent to user!");

    }).catch((err)=>{
    submitNotification("Error", " Something went wrong");


    });
    props.editPurchaseStatus(data)
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
    sendToUser: (data) => dispatch(sendToUser(data)),
    editPurchaseStatus: (data) => dispatch(editPurchaseStatus(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendItemIcon);
 