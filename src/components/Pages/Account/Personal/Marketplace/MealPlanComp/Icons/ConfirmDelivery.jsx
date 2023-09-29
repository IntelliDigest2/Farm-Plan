import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { editPurchaseStatusOnFarmer } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useHistory } from 'react-router'
import { useTranslation, Trans } from 'react-i18next';
import { addToFarmerSalesData, addToSalesData } from "../../../../../../../store/actions/dataActions";


//takes props value, meal(name), ingredients, id and onChange(change of value)
function ConfirmDelivery(props) {

  const { t } = useTranslation();

  let history = useHistory();

  const [showModal, setShow] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const handlePay = async () => {

    const transferData = {
      trackingID: props.trackingID,
    };
    
    await fetch(`${baseUrlDev}/v1/payment/confirm-delivery`, {

      method: 'POST', 
      body: JSON.stringify(transferData),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((res) => {
      const receiversID = props.receiversID
      const receiversName = props.receiversName
      // Loop through cart items and dispatch addToSales for each item
      props.cartItems.forEach((cartItem) => {
        const salesData = {
          batchNumber: null,
          brandName: null,
          companyID: props.farmerID,
          customerInfo: {
            customerID: receiversID,
            customerName: receiversName
          },
          medium: "inApp",
          productName: cartItem.data,
          productType: 'Horticulture',
          price: {
            amount: cartItem.price,
            currency: cartItem.currency
          },
          quantity: cartItem.quantity,
          unit: cartItem.measure,
          currency: cartItem.currency,
        };
        // Dispatch addToSales action for each item
        props.addToSales(salesData);
        props.addToFarmerSalesData(salesData);
      });

      const data = {
        farmerRef: props.farmerRef,
        farmerID: props.farmerID,
        status: "COMPLETED",
      };
      props.editPurchaseStatusOnFarmer(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  
 };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="pay with wallet">
        <IconButton
          aria-label="Pay"
          sx={{ ml: 2 }}
          onClick={handleShow}
        >
            <CheckCircleIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delivery</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>Have you received the item as expected?</h5></p>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          handlePay()
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
    addToSales: (data) => dispatch(addToSalesData(data)),
    addToFarmerSalesData: (data) => dispatch(addToFarmerSalesData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelivery);
