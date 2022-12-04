import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import ScannerInventory from "../../../../../../SubComponents/QRCode/ScannerInventory";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";


import { connect } from "react-redux";
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddToInventoryForm = (props) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");
  const [show, setShow] = useState(true);

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

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        ingredients: local.food + " " + local.quantity + " " + local.measure,
      },
    };

    props.addToInventory(data);
    // props.createMealPlanData(data);
    // props.forceUpdate();
  };

  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      setExpand("+ scan from barcode");
    } else {
      setExpand("- input manually");
    }
  };

  useEffect(() => {
    console.log("item", local.food);
  }, [local.food]);

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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.setUpdate(props.update + 1);
            props.handleFormClose();
          }}
        >
          
          <FoodItemSearch handleFoodSearch={handleFoodSearch} />
        <Form.Group>
        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <Form.Control
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
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups"]}
            function={(e) => {
              setLocal({ ...local, measure: e });
            }}
          />
        </InputGroup>
      </Form.Group>

          <div style={{ alignItems: "center" }}>
            <Button className="blue-btn shadow-none mt-3" type="submit">
              Done
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
