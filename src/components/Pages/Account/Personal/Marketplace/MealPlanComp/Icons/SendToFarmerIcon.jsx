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
      farmerId: props.farmerId,
      status: "IN PROGRESS",
      upload: {
        cart: props.cart,
        status: "IN PROGRESS"
      },
    };
    props.sendToFarmer(data);
    //props.editPurchaseStatus(data)
    submitNotification("Success", " Items has been sent to farmer!");
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
 