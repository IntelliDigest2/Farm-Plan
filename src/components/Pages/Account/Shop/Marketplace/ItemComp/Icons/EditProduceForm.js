import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editItemData } from "../../../../../../../store/actions/shopActions/shopPlanData";
import DatePicker from "react-datepicker";
import moment from "moment";
import { submitNotification } from "../../../../../../lib/Notifications";

function EditProduceForm(props) {
const [itemName, setItemName] = useState(props.shopItems?.item || "");
const [quantity, setQuantity] = useState(props.shopItems?.quantity || "");
const [measure, setMeasure] = useState(props.shopItems?.measure || "");

  const [show, setShow] = useState(true);

  const handleMeasureChange = (e) => {
    setMeasure(e.target.value);
  };

 
  const handleSubmit = () => {
    const data = {
      id: props.id,
      upload: {
        item: itemName,
        quantity: quantity,
        measure: measure,
        id: props.id,
      },
    };
      //console.log("edited data", data)
      props.editItemData(data);
      submitNotification("Success","Item has been Edited");
      props.forceUpdate();
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >

          <div>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                onChange={handleMeasureChange}
              />
            </InputGroup>
            </Form.Group>

        </div>
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
    editItemData: (data) => dispatch(editItemData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduceForm);
