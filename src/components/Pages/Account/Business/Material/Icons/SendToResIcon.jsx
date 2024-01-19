import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sendOrderToUser, sendToRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import SendIcon from '@mui/icons-material/Send';
import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SendToRes(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      restaurantID: props.order.restaurantID,
      status: "IN PROGRESS",
      upload: {
        order: props.order,
        seat: props.seat,
        fullname: props.fullname,
        status: "IN PROGRESS"
      },
    };
    props.sendToRes(data);
    // props.sendOrderToUser(data);
    //props.editPurchaseStatus(data)
    submitNotification("Success", " Items has been sent to restaurant!");
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendToRes: (data) => dispatch(sendToRes(data)),
    // sendOrderToUser: (data) => dispatch(sendOrderToUser(data))
  };
};

export default connect(null, mapDispatchToProps)(SendToRes);
 