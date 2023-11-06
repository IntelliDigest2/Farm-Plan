import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { editPurchaseStatusOnFarmer } from "../../../../../../../store/actions/marketplaceActions/farmPlanData";
import { sendOrderToFarmerFromSupplier, sendToUser } from "../../../../../../../store/actions/dataActions";

import { useTranslation, Trans } from 'react-i18next';
import '../../../../../../SubComponents/Button.css'

import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { editPurchaseStatusOnSupplier } from "../../../../../../../store/actions/supplierActions/supplierData";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function ConfirmItemIconFarm(props) {

  const { t } = useTranslation();


  const [showModal, setShow] = useState(false);

 // console.log("to inventory ==> ", props.food)
 const handleSelect = async () => {

  switch (props.confirmType) {

    case "farmer":
      const dataFarmer = {
        //need to send shopping list data to be bought the previous week from the day it is made
        id: props.id,
        farmerRef: props.farmerRef,
        status: "ACCEPTED",
        item: props.item,
        currency: props.currency,
        farmerID: props.farmerID,
        receiversID: props.receiversID,
        deliveryDueDate: props.deliveryDueDate,
        delivery_code: props.delivery_code,
        buyers_account_type: props.buyers_account_type,
      };
      // Handle case when supplyType is "farmer"
      props.editPurchaseStatusOnFarmer(dataFarmer);
      props.sendToUser(dataFarmer)
      .then((resp) => {
        submitNotification("Success", "You will receive a notification when the user completes payment");
      })
      .catch((err) => {
        submitNotification("Error", "Something went wrong, try again");
        console.log("error", err);
      });
      break;

    case "supplier":
      const dataSupplier = {
        //need to send shopping list data to be bought the previous week from the day it is made
        farmerRef: props.farmerRef,
        status: "ACCEPTED",
        item: props.item,
        currency: props.currency,
        farmerID: props.companyID,
        receiversID: props.receiversID,
        deliveryDueDate: props.deliveryDueDate,
        delivery_code: props.delivery_code,
        buyers_account_type: props.buyers_account_type,
      };
      // Handle case when supplyType is "supplier"
      props.editPurchaseStatusOnSupplier(dataSupplier);

      props.sendOrderToFarmerFromSupplier(dataSupplier)
      .then((resp) => {
        submitNotification("Success", "You will receive a notification when the user completes payment");
      })
      .catch((err) => {
        submitNotification("Error", "Something went wrong, try again");
        console.log("error", err);
      });
      break;

    case "restaurant":
      // Handle case when supplyType is "restaurant"
      // Add your logic for restaurant here
      break;

    default:
      // Handle the default case if supplyType is something else
      break;
  }
};

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
        >
          <Button className="blue-btn shadow-none mt-3" onClick={handleShow}>
          {t('description.button_confirm')}
          </Button> 
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.button_confirm')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.accept_to_deliver')}</h5></p>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          handleSelect()
          handleClose()
        }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" 
            onClick={handleClose}
          >
            {t('description.button_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

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
    editPurchaseStatusOnFarmer: (data) => dispatch(editPurchaseStatusOnFarmer(data)),
    editPurchaseStatusOnSupplier: (data) => dispatch(editPurchaseStatusOnSupplier(data)),
    sendToUser: (data) => dispatch(sendToUser(data)),
    sendOrderToFarmerFromSupplier: (data) => dispatch(sendOrderToFarmerFromSupplier(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmItemIconFarm);
