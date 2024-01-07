import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import ScannerInventory from "../../../../../../SubComponents/QRCode/ScannerInventory";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useTranslation, Trans } from 'react-i18next';


import { connect } from "react-redux";
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import MeasurementConverter from "../Converter";

const AddToInventoryForm = (props) => {
  const { t } = useTranslation();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState(<span className="scan-text">+ scan from barcode</span>);
  const [show, setShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [showConverterModal, setShowConverterModal] = useState(false);

  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g", 
    foodId: "",
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };

  const handleFoodSearch = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, food: e.target.textContent });
    } else {
      setLocal({ ...local, food: e.target.value });
    }
  };

  //control modal
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
  }

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        ingredients: local.food + " " + local.quantity + "" + local.measure,
        item: local.food,
        measure: local.measure,
        quantity: local.quantity,
        //quantity: local.quantity
        expiry: moment(startDate).format("DD/MM/yyyy"),
        created_at: new Date()
      },
    }; 

    console.log("lets do this:", data)

    props.addToInventory(data);
    // props.createMealPlanData(data);
    forceUpdate();
  };

  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      <span className="scan-text">+ scan from barcode</span>
    } else {
      <span className="scan-text">- input manually</span>
    }
  };

  useEffect(() => {
    console.log("item", local.food);
  }, [local.food]);

  const handleConverterButtonClick = () => {
    setShowConverterModal(true);
  };

  const closeConverterModal = () => {
    setShowConverterModal(false);
  };


  return (
    <div>
      <button
        className="btn success shadow-none qrcode-btn"
        onClick={() => handleSetScan()}
      >
        {expand}
      </button>
      {scan ? (
        <ScannerInventory handleFormClose={handleFormClose}/>
      ) : (
        <Form
          className="custom-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.setUpdate(props.update + 1);
            props.handleFormClose();
          }}
        >
          
        <FoodItemSearch handleFoodSearch={handleFoodSearch} />
       

      {/* "Use Converter" Button */}
      <Button
        className="blue-btn shadow-none mt-3"
        onClick={handleConverterButtonClick}
      >
        Use Converter
      </Button>

          {/* Measurement Converter Modal */}
          <Modal show={showConverterModal} onHide={closeConverterModal}>
            <Modal.Header closeButton>
              <Modal.Title>Measurement Converter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* The MeasurementConverter component */}
              <MeasurementConverter />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeConverterModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

      <Form.Group>
        <Form.Label>{t('description.amount')}</Form.Label>
        <InputGroup>
          <Form.Control
            className="signup-input-qty"
            id="quantity"
            type="number"
            min="0"
            step=".1"
            onChange={(e) => handleLocal(e)}
            value={local.quantity}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={local.measure}
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups", "units", "pcs", "oz", "lbs"]}
            function={(e) => {
              setLocal({ ...local, measure: e });
            }}
          />
        </InputGroup>
        <Form.Label>{t('description.expiry_date')}</Form.Label>
        <DatePicker
          className="signup-input-meal-name" 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          dateFormat="dd/mm/yyyy"  
        />
        {/* <Form.Control
          type="text"
          id="expiry"
          onChange={(e) => handleLocal(e)}
          value={local.expiry}
        /> */}
      </Form.Group>

          <div style={{ alignItems: "center" }}>
            <Button className="blue-btn shadow-none mt-3" type="submit">
            {t('description.button_done')}
            </Button>
          </div>
        </Form>
      )}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToInventory: (data) => dispatch(addToInventory(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToInventoryForm);
