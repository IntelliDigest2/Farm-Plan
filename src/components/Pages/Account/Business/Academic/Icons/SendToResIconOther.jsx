import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sendOrderToUser, sendToRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import SendIcon from '@mui/icons-material/Send';
import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SendToRes(props) {

  const handleSelect = async () => {
    // Check if fullname and reservationDate are empty
    if (props.fullname.trim() === "" || props.seat.trim() === "") {
      submitNotification("Error", "Please enter fullname and reservation date");
    } else {
      // Proceed with sending the data to the database
      const data = {
        restaurantID: props.order.restaurantID,
        upload: {
          order: [{
            city: props.order.city,
            email: props.order.email,
            ingredients: props.order.ingredients,
            mealCurrency: props.order.mealCurrency,
            mealDescription: props.order.mealDescription,
            mealID: props.order.mealID,
            // mealType: props.order.mealType,
            meal_name: props.order.meal_name,
            restaurantID: props.order.restaurantID,
            restaurant_name: props.order.restaurant_name,
          }],
          seat: props.seat,
          fullname: props.fullname,
          status: "IN PROGRESS",
          userID: props.profile.uid,
          userRequestAccountType: props.profile.buildingFunction
        },
      };
      props.sendToRes(data)
        .then(() => {
          submitNotification("Success", "Eating out items has been sent to the restaurant!");
        })
        .catch(() => {
          submitNotification("Error", "Something went wrong, please try again");
        });
    }
  };

 // console.log("to inventory ==> ", props.food)

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
 