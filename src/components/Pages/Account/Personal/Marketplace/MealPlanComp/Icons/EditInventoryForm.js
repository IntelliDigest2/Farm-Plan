import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editInventoryData } from "../../../../../../../store/actions/marketplaceActions/inventoryData"
import DatePicker from "react-datepicker";
import moment from "moment";


function EditInventoryForm(props) {
  const [ingredients, setIngredients] = useState([props.ingredients]);
  const [ExpiryDate, setExpiryDate] = useState(props.expiry);
  const [placeOfPurchase, setPlaceOfPurchase] = useState("");
  const [storage, setStorage] = useState("Choose Storage");


  //console.log("checking ingredients:", props)


  const handleSubmit = () => {
    const data = {
      // month: props.value.format("YYYYMM"),
      // day: props.value.format("DD"),
      id: props.id,
      upload: {
        ingredients: ingredients,
        id: props.id,
        expiry: moment(ExpiryDate).format("DD/MM/yyyy"),
        purchase: placeOfPurchase,
        storage: storage
      },
    };
    if (props.saved) {
      props.editSavedMeal(data);
      props.forceUpdate();
    } else {
      props.editInventoryData(data);
      props.setUpdate(props.update + 1);
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          type="text"
          id="food"
          defaultValue={ingredients}
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />
      </Form.Group>

      {/* <Form.Group>
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control
          type="text"
          id="expiry"
          selected={ExpiryDate}
          onChange={(e) => {
            setExpiryDate(e.target.selected);
          }}
        />
      </Form.Group> */}

      <Form.Group>
        <Form.Label>Expiry Date</Form.Label>
        <DatePicker 
          type="text"
          id="expiry"
          selected={ExpiryDate} 
          onChange={(e) => setExpiryDate(e)} 
          dateFormat="dd/MM/yyyy"  
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Place of Purchase</Form.Label>
        <Form.Control
          type="text"
          id="food"
          defaultValue={placeOfPurchase}
          onChange={(e) => {
            setPlaceOfPurchase(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Dropdown
            id="storage"
            styling="grey dropdown-input"
            data={storage}
            items={[
              "Cool dry place", 
              "Air-tight container", 
              "Fridge", 
              "Freezer", 
              "Others"]}
              function={(e) => {
              setStorage(e);
            }}
          />
      </Form.Group>

      
      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn" type="submit">
          Done
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editInventoryData: (data) => dispatch(editInventoryData(data)),
    editSavedMeal: (data) => dispatch(editSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInventoryForm);
