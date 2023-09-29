import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { editPurchaseStatusOnUser } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useHistory } from 'react-router'
import { useTranslation, Trans } from 'react-i18next';


//takes props value, meal(name), ingredients, id and onChange(change of value)
function PayIconWallet(props) {

  const { t } = useTranslation();

  let history = useHistory();

  const [showModal, setShow] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const handlePay = async () => {

    const transferData = {
      user: props.uid,
      order: props.order, 
    };

    console.log("transfer data ===>", transferData)

    
    await fetch(`${baseUrlDev}/v1/payment/initiate-payment`, {

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
        status: "COMPLETED",
      };
      props.editPurchaseStatusOnUser(data);
      // history.push('/payment-success')

      const newPage = window.open('/payment-success', '_blank');
  
      // Optionally, you can focus on the new window/tab
      if (newPage) {
        newPage.focus();
      }
      handleClose()
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayIconWallet);
