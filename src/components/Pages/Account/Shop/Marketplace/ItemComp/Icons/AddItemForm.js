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
  const [produceName, setProduceName] = useState("");
  const [farmType, setFarmType] = useState("Horticulture");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const [show, setShow] = useState(true);
  const [produceDate, setProduceDate] = useState(new Date());


  const defaultLocal = {
    item: "",
    quantity: 0,
    measure: "units", 
    price: "",
    currency: "$"
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
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
        item: local.item,
        measure: local.measure,
        quantity: local.quantity,
        price: local.price,
        currency: local.currency,
        //quantity: local.quantity
        createdAt: new Date()

      },
    }; 

    props.addItemData(data);
    submitNotification("Success","Item has been added");
    forceUpdate();
  };


  return (
    <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            // props.setUpdate(props.update + 1);
            props.handleFormClose();
          }}
        >

          <div>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => handleLocal(e)}
                value={local.item}
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
                onChange={(e) => handleLocal(e)}
                value={local.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={local.measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setLocal({ ...local, measure: e });
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
                onChange={(e) => handleLocal(e)}
                value={local.price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={local.currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setLocal({ ...local, currency: e });
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

const mapStateToProps = (state) => {
  return {
    shopItems: state.shopData.shopItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemData: (data) => dispatch(addItemData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);

