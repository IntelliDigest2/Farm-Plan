import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.js";
import { Dropdown } from "../../../../../../SubComponents/Dropdown.js";
import DatePicker from "react-datepicker";
import moment from "moment";


import { connect } from "react-redux";
import { addItemData } from "../../../../../../../store/actions/shopActions/shopPlanData.js";
import { submitNotification } from "../../../../../../lib/Notifications.js";
// import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddItemForm = (props) => {
 
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("g");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("$");

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        item: item,
        measure: measure,
        quantity: quantity,
        price: price,
        currency: currency,
        imageURL: Url,
        //quantity: local.quantity
        createdAt: new Date()

      },
    }; 

    props.addItemDataSample(data);
    submitNotification("Success","Item has been added");
    forceUpdate();
  };

  
  return (
    <div>
        <Form>
          <div>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => {
                  setItem(e.target.value);
                }}                
                value={item}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step=".5"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}                 
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setMeasure(e);
                }} 
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
            <Form.Label>Estimated Price Per Unit</Form.Label>
            <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => {
                  setPrice(e.target.value);
                }} 
                defaultValue={price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setCurrency(e);
                }} 
              />
            </InputGroup>
            </Form.Group>

        </div>
          <div style={{ alignItems: "center" }}>
            <Button className="blue-btn shadow-none mt-3" type="submit">
              Done
            </Button>
          </div>
        </Form>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    addItemDataSample: (data) => dispatch(addItemDataSample(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddItemForm);

