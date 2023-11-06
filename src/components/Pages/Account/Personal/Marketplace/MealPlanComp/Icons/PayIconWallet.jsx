import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { editPurchaseStatusOnUser, editPurchaseStatusOnFarmerSupplier } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useHistory } from 'react-router'
import { useTranslation, Trans } from 'react-i18next';
import Swal from 'sweetalert2';
import {sendPaymentNotificationToSeller} from './notificationData.js';


//takes props value, meal(name), ingredients, id and onChange(change of value)
function PayIconWallet(props) {

  const { t } = useTranslation();

  let history = useHistory();

  const [showModal, setShow] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const handlePay = async () => {

    switch(props.payType) {
      case "user":
        const transferData = {
          user: props.uid,
          order: props.order, 
          currency: props.currency,
        };
    
        console.log("transfer data ===>", transferData)
    
        
        await fetch(`${baseUrlProd}/v1/payment/initiate-payment`, {
    
          method: 'POST', 
          body: JSON.stringify(transferData),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((res) => {
          console.log("reservation ===>", res)
          const data = {
            refID: props.refID,
            farmerRef: props.farmerRef,
            farmerID: props.farmerID,
            status: "COMPLETED",
          };
          props.editPurchaseStatusOnUser(data);
          // props.editPurchaseStatusOnFarmer(data)
    
    
          // props.sendPaymentNotificationToSeller(props.personReceivingPaymentAccountType.personReceivingPaymentID)
    
          // history.push('/payment-success')
          Swal.fire({
            title: 'Success!',
            text: 'Payment was successful',
            icon: 'success',
          });
          const newPage = window.open('/payment-success', '_blank');
      
          // Optionally, you can focus on the new window/tab
          if (newPage) {
            newPage.focus();
          }
          handleClose()
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            title: 'Error!',
            text: 'Please check your wallet balance and try again',
            icon: 'error',
          });
        })
        break;

      case "farmer":
        const transferDataFarmer = {
          user: props.uid,
          // order: props.order,
          order: {
            buyers_account_type: props.order.buyers_account_type,
            currency: props.order.currency,
            deliveryDueDate: props.order.deliveryDueDate,
            delivery_code: props.data.delivery_code,
            eventId: props.order.id,
            farmerID: props.order.farmerID,
            farmerRef: props.order.farmerRef,
            id: props.order.id,
            item: Array.isArray(props.order.item)
              ? props.order.item.map(item => ({
                  currency: item.currency,
                  data: item.productName, // Rename the property to 'data'
                  price: item.price,
                  measure: item.productMeasure,
                  convertedPrice: item.convertedPrice,
                  quantity: item.quantity,
                }))
              : [], // Make sure it's an array or default to an empty array
            // item: props.order.item,
            receiversID: props.order.receiversID,
            status: "COMPLETED"
          }, 
          currency: props.currency,
        };
    
        console.log("transfer data ===>", transferDataFarmer)
    
        
        await fetch(`${baseUrlProd}/v1/payment/initiate-payment`, {
    
          method: 'POST', 
          body: JSON.stringify(transferDataFarmer),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((res) => {
          console.log("reservation ===>", res)
          const data = {
            refID: props.refID,
            farmerRef: props.supplierRef,
            farmerID: props.supplierID,
            status: "COMPLETED",
          };
          // props.editPurchaseStatusOnUser(data);
          props.editPurchaseStatusOnFarmerSupplier(data)
    
    
          // props.sendPaymentNotificationToSeller(props.personReceivingPaymentAccountType.personReceivingPaymentID)
    
          // history.push('/payment-success')
          Swal.fire({
            title: 'Success!',
            text: 'Payment was successful',
            icon: 'success',
          });
          const newPage = window.open('/payment-success', '_blank');
      
          // Optionally, you can focus on the new window/tab
          if (newPage) {
            newPage.focus();
          }
          handleClose()
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            title: 'Error!',
            text: 'Please check your wallet balance and try again',
            icon: 'error',
          });
        })
      
    }
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
            Pay <CreditScoreIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.payment')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.continue_to_payment')}</h5></p>
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
    editPurchaseStatusOnUser: (data) => dispatch(editPurchaseStatusOnUser(data)),
    editPurchaseStatusOnFarmerSupplier: (data) => dispatch(editPurchaseStatusOnFarmerSupplier(data))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayIconWallet);
