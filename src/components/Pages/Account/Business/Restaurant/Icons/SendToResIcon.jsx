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
      upload: {
        order: props.order,
        seat: props.seat,
        fullname: props.fullname,
        status: "IN PROGRESS",
        userID: props.profile.uid,
        userRequestAccountType: props.profile.buildingFunction
      },
    };
    props.sendToRes(data).then((resp)=>{
    submitNotification("Success", " Eating out items has been sent to restaurant!");

    }).catch(()=>{
    submitNotification("Error", " Something went wrong, pls try again");

    });
    // props.sendOrderToUser(data);
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
  // console.log(state);
  return {
    profile: state.firebase.profile,
  };  
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendToRes: (data) => dispatch(sendToRes(data)),
    // sendOrderToUser: (data) => dispatch(sendOrderToUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendToRes);
 